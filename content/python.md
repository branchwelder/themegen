```python
import urllib.parse, urllib.request, urllib.error, json

baseURL = "http://api.magicthegathering.io/v1/cards?"

def getCard(name="Bitterblossom"):
    pdict={"name": name}
    fullurl = baseURL +urllib.parse.urlencode(pdict)
    print(fullurl)
    try:
        return json.load(urllib.request.urlopen((fullurl)))
    except urllib.error.URLError as e:
        print(e)

print(getCard("Bitterblossom"))
```
