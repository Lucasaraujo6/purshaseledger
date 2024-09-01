import requests

def get_product_name_by_barcode(barcode):
    # OPEN FOOD FACTS
    url = f"https://world.openfoodfacts.org/api/v0/product/{barcode}.json"
    response = requests.get(url)
    if response.status_code == 200:
        dados = response.json()
        if dados['status'] == 1:
            produto = dados['product']
            nome = produto.get('product_name', 'Nome não disponível')
            return (nome)
        else:
            print("Produto não encontrado")
    else:
        print("Erro na consulta")
    
    # Bluesoft Cosmos
    # url = f"https://api.cosmos.bluesoft.com.br/gtins/{barcode}"
    # url = f"https://api.cosmos.bluesoft.com.br/gtins/{barcode}"
    # headers = {
    #     "X-Cosmos-Token": "MLqJsarxVXMpo4mOKIcbNg"
    # }
    # response = requests.get(url, headers=headers)
    # if response.status_code == 200:
    #     data = response.json()
    #     product_name = data.get('description', 'Nome não disponível')
    #     return product_name
    # else:
    #     return "Produto não encontrado"

# def get_product_gtin(description):
#     url = f"https://api.cosmos.bluesoft.com.br/products?query={description}"
#     headers = {
#         "X-Cosmos-Token": "MLqJsarxVXMpo4mOKIcbNg"
#         # ,'Content-Type': 'application/json',
#         # 'User-Agent': 'Cosmos-API-Request'
#     }
#     response = requests.get(url, headers=headers)
#     print(response)
#     if response.status_code == 200:
#         data = response.json()
#         print(data)
#         data = data.get('products',None)
#         if data: return data[0]['gtin']
#         else: return "Produto não encontrado"
#     else:
#         return "Produto não encontrado"
