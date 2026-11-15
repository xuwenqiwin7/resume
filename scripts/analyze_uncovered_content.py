"""Rebuild aggregate-only content analysis of legacy unmatched comments.
Usage: python scripts/analyze_uncovered_content.py PRIVATE_ARCHIVE.zip --out .
This script never writes comment text, account identifiers or source URLs.
"""
from pathlib import Path
import argparse,csv,hashlib,io,json,re,collections,zipfile

def rebuild(archive,out):
 out=Path(out);book=json.loads((out/'uncovered-analysis-codebook.json').read_text(encoding='utf8'))
 with zipfile.ZipFile(archive) as z:payload=z.read('03_多平台清洗与统计/02_清洗数据/评论.csv')
 if hashlib.sha256(payload).hexdigest()!=book['source_csv_sha256']:raise ValueError('Source differs: frozen ordinal review adjustments must not be applied to changed input')
 rows=list(csv.DictReader(io.StringIO(payload.decode('utf-8-sig'))))
 core=[x for x in rows if book['scope'][0]<=x['发布时间_北京时间'][:10]<=book['scope'][1]]
 def legacy_label(t):
  neg=any(w in t for w in book['legacy_negative_terms']);pos=False
  for w in book['legacy_positive_terms']:
   for m in re.finditer(re.escape(w),t):
    before=t[max(0,m.start()-4):m.start()]
    if not re.search(r'(不|没|未|无|别|非|无法|不能|并非|毫无|谈不上|难以|不太|不是很|不怎么)$',before):pos=True;break
  return 'both' if neg and pos else 'negative' if neg else 'positive' if pos else 'uncovered'
 legacy=collections.Counter(legacy_label(x['正文_基础脱敏']) for x in core)
 selected=[x for x in core if legacy_label(x['正文_基础脱敏'])=='uncovered']
 assert len(core)==4828 and len(selected)==3909 and legacy=={'negative':396,'positive':428,'both':95,'uncovered':3909},legacy
 def classify(t):
  x=re.sub(r'回复\s*@[^:：\n]{1,80}[:：]','',t);x=re.sub(r'\[提及账号\]','',x).strip()
  x=re.sub(r'图片评论|评论配图|查看图片|\[图片\]|网页链接','',x)
  if not x.strip():return '空文本或附件占位'
  bare=re.sub(r'\[[^\[\]]{1,15}\]|[\W_]+','',x)
  if not bare:return '表情符号或标点反应'
  x=re.sub(r'\[[^\[\]]{1,15}\]','',x)
  for label,pattern in book['ordered_patterns'].items():
   if re.search(pattern,x,re.I):return label
  if len(bare)<=25 and re.search(book['fallback_assent_pattern'],x):return '简短附和或反驳'
  if re.search(book['fallback_reaction_pattern'],x):return '感受反应与语气表达'
  return '简短指代或语境依赖回复' if len(bare)<=25 else '观点补充与推断性讨论'
 counts=collections.Counter();cross=collections.defaultdict(collections.Counter)
 for i,x in enumerate(selected):
  label=book['review_overrides'].get(str(i),classify(x['正文_基础脱敏']));counts[label]+=1;cross[label][x['平台']]+=1
 templates={x['label']:x for x in book['categories']};categories=[]
 for label,n in counts.most_common():
  item=dict(templates[label]);item['count']=n;item['by_platform']=dict(cross[label]);categories.append(item)
 assert sum(counts.values())==3909
 public={'schema':1,'version':book['version'],'source_sha256':book['source_csv_sha256'],'scope':book['scope'],'core_comments':4828,'legacy_uncovered':3909,'legacy_counts':dict(legacy),'categories':categories,'platform_counts':dict(collections.Counter(x['平台'] for x in selected)),'review_summary':{'frozen_adjustments':len(book['review_overrides']),'targeted_residual_adjustments':633,'fixed_audit_sample_size':70,'audit_adjustments':8,'independent_human_validation':False},'method':'AI-assisted exploratory content/function rescreen; not a new sentiment or stance classification; primary labels sum to the legacy uncovered subset.'}
 text=json.dumps(public,ensure_ascii=False,indent=2)+'\n';(out/'uncovered-analysis.json').write_text(text,encoding='utf8');(out/'uncovered-analysis.js').write_text('window.SV_UNCOVERED_ANALYSIS = '+text.strip()+';\n',encoding='utf8')
 with (out/'uncovered-analysis-summary.csv').open('w',encoding='utf-8-sig',newline='') as f:
  w=csv.writer(f);w.writerow(['primary_category','records','denominator','share_of_uncovered','scope'])
  for x in categories:w.writerow([x['label'],x['count'],3909,round(x['count']/3909,6),'2026-06-22/2026-07-08'])
 print(json.dumps({'core_comments':len(core),'legacy_uncovered':len(selected),'categories':dict(counts),'sum':sum(counts.values())},ensure_ascii=False))

if __name__=='__main__':
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('archive');p.add_argument('--out',default='.')
 a=p.parse_args();rebuild(a.archive,a.out)
