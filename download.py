import urllib.request

mp3_url = "https://www.myinstants.com/media/sounds/fahhh_KcgAXfs.mp3"
req = urllib.request.Request(mp3_url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response, open("public/fahhh.mp3", 'wb') as out_file:
    out_file.write(response.read())
print("Downloaded to public/fahhh.mp3")
