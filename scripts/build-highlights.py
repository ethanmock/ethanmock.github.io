#!/usr/bin/env python3
"""Build static research-page entrypoints and shared content from data/highlights.json."""
import json,html
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
works=json.loads((ROOT/'data/highlights.json').read_text())
(ROOT/'research/content.js').write_text('window.RESEARCH_WORKS = '+json.dumps(works,ensure_ascii=False).replace('</','<\\/')+';\n')
for work in works:
 title=html.escape(work['name']+' — '+work['area']['en']+' | Yixin Su')
 description=html.escape(work['summary']['en'],quote=True)
 page=f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title><meta name="description" content="{description}"><meta name="theme-color" content="{work['color']}">
<link rel="stylesheet" href="style.css"><script src="content.js" defer></script><script src="page.js" defer></script></head>
<body data-work="{work['id']}"><main id="app"></main><noscript><h1>{title}</h1><p>{description}</p><a href="{work['source']}">Read the paper</a></noscript></body></html>\n'''
 (ROOT/'research'/f"{work['id']}.html").write_text(page)
print('[highlights] built 3 research pages and shared content')
