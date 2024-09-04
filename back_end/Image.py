import easyocr, Product, re

# Criar o leitor
leitor = easyocr.Reader(['pt'])

# Ler texto da imagem
result = leitor.readtext('./nota3.jpeg')


print("\n\n\n")
# def split_text_by_comma(text):
#     print(text)
#     lines = []
#     i = 0
#     previous = 0
#     while i < len(text):
#         if text[i] == ',':
#             if i + 5 < len(text) and text[i+5] == ',':
#                 # print(text[i+4])
#                 i += 8  # Avança três posições para pular a vírgula e os dois caracteres
#                 lines.append(text[previous:i])
#                 previous = i+1
#             elif i + 4 < len(text) and text[i+4] == ',':
#                 # print(text[i+4])
#                 i += 7  # Avança três posições para pular a vírgula e os dois caracteres
#                 lines.append(text[previous:i])
#                 previous = i+1

#         if i == len(text):
#             break  # Sai do loop se não houver duas casas adiante
#         else:
#             # print(i)
#             i += 1  # Avança para o próximo caractere
#     for line in lines: print (line,'\n')
#     return lines

def extract_text_from_results(results):
    startNote = False
    text = []
    for idx, res in enumerate(results):
        if ('TOTAL' in res[1].upper() or 'TOTA]' in res[1].upper()) and idx > 30: #indica que a linha atual em diante já é desnecessária
            startNote = False

        if startNote:
            text.append(res[1]) # aqui eu salvo apenas o texto, sem a precisão nem as posições
            print(res[1], idx)
        # else:
        #     print('res[1]')

        if ('TOTAL' in res[1].upper() or 'TOTA]' in res[1].upper()) and idx < 30: #indica que vai começar na próxima linha
            # input(f'aqui começa {idx}')
            startNote = True
    # input('finalizei a extração da área que contém compras')
    return text


def treat_note(text):
    i = 1
    current = text[0]
    treated_note = []
    while i < len(text):
        # print(current)
        # print()
        if len(text[i]) < 5 or ',' in text[i][0:10] or ' ' in text[i][0:5]:

            current += text[i]

            i += 1
            continue
        else:
            treated_note.append(current)
            current = text[i]
            i += 1
    if len(text[i-1]) < 5 or ',' in text[i-1][0:10]:
        treated_note.append(current)
    return treated_note

def extract_codes(strings):
    numbers = []
    for s in strings:
        # Encontrar o índice do primeiro espaço
        space_index = s.find(' ')
        if space_index != -1:
            # Extrair a substring até o primeiro espaço
            s = s[:space_index].replace('o','0').replace('O','0')

            # Substituir 'o' e 'O' por '0'
            s = s.replace('o', '0').replace('O', '0')
            
            # Remover caracteres que não são números
            s = re.sub(r'\D', '', s)
            
            # Adicionar a cadeia numérica resultante
            if s:
                numbers.append(s)
    return numbers

def print_goods(barcodes):
    for idx, barcode in enumerate(barcodes):
        print(barcode," ",Product.get_product_name_by_barcode(barcode),'\n')

# text = "7896982100059 ovos BCos HAht €/30BJ X 19,9919,997896005800539 CAFE 3 COR FoRT 2506PTx 7,9931,967896003738506 BISC HARIL HAIZ 1706 3 PT2,507,50(7896051167006 BEB LaC Itahb 5406 2 BJ x 5,4810,96(7891150044616 KIT SaB DoV C/6 L+P-2 CJ X 19,9039,80(7896512904324 POLV ANtIS GRak 1oogFR * 14,9514,957896051111023 LTE L V Bh Int 1L 3 TP x 4,9814,9474m81,6267690 Abacate 0,785 kg x 3,983,127622210571847 REF Po TanG 186 EvEv * 0,980,987622210571526 REF Po Tang 186 EVEV X 0,980,987895144297583 BAlA HASTIG FRUI 406PT x 2,482,4878938847  DROPS HALLS 286PTX 1,887,527895800112786 CHIC TRIDENT HeN C/4PT8,388,389771519374128 REvISTA DIV 03UN x 1,951,9527"
for line in result: print(line[1])
text = extract_text_from_results(result)
print('\n\n\n Resultado do da extração limitada pelo início e fim')
for line in text: print(line)
note = treat_note(text)
print('\n\n\n Resultado do tratamento')
for good in note: print(good)
barcodes = extract_codes(note)
print(barcodes)
goods = print_goods(barcodes)

    
    