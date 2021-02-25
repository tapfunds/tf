

def check_error_exist(dict):
    error = False
    for _, val in dict.items():
        if val != '' or val != 0:
             error = True
             return error
        else:
            continue
    return error

