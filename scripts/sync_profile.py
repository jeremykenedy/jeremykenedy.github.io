"""Mirror github.com/jeremykenedy (profile README) into this GitHub Pages site.

Fetches README.md from jeremykenedy/jeremykenedy, rewrites repository-relative links and
images to absolute GitHub URLs, and writes index.md. Standard library only.
"""
import re
import urllib.request
from pathlib import Path

RAW = "https://raw.githubusercontent.com/jeremykenedy/jeremykenedy/main/"
CDN = "https://cdn.jsdelivr.net/gh/jeremykenedy/jeremykenedy@main/"
BLOB = "https://github.com/jeremykenedy/jeremykenedy/blob/main/"


def absolutize(text):
    def fix(match):
        attr, quote, url = match.group(1), match.group(2), match.group(3)
        if re.match(r"^(https?:|mailto:|#|//)", url):
            return match.group(0)
        base = CDN if url.startswith("art/") or attr == "src" or attr == "srcset" else BLOB
        return f'{attr}={quote}{base}{url}'
    text = re.sub(r'(src|srcset|href)=(["\'])([^"\']+)', fix, text)
    text = re.sub(r'\]\((?!https?:|#|mailto:)([^)]+)\)', lambda m: f']({BLOB}{m.group(1)})', text)
    return text


def main():
    readme = urllib.request.urlopen(RAW + "README.md", timeout=60).read().decode("utf-8")
    body = absolutize(readme)
    front = "---\nlayout: default\ntitle: Jeremy Kenedy | Director of Engineering\n---\n{% raw %}\n"
    Path("index.md").write_text(front + body + "\n{% endraw %}\n", encoding="utf-8")


if __name__ == "__main__":
    main()
