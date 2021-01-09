from googleapiclient.discovery import build
api_key = "AIzaSyAfboVtmwroPudlCYxI8Yvk26xeKlzstyg"  # api key
cse_id = "cbbd92a62388128b6"  # custom search engion id


def googleSearch(query, api_key, cse_id, **kwargs):
    service = build("customsearch", "v1", developerKey=api_key)
    res = service.cse().list(q=query, cx=cse_id, **kwargs).execute()
    return res


def searchResult(query):
    result = googleSearch(query, api_key, cse_id)
    # result: dict_keys(['kind', 'url', 'queries', 'context', 'searchInformation', 'items'])
    # print(result['url']['template']) # url

    # print([result['items'][i].keys() for i in range(len(result))])
    # dict_keys(['kind', 'title', 'htmlTitle', 'link', 'displayLink', 'snippet', 'htmlSnippet', 'cacheId', 'formattedUrl', 'htmlFormattedUrl', 'pagemap']
    output = [{"title": result['items'][i]['title'], "url": result['items'][i]['link']}
              for i in range(0, 3)]
    return output
