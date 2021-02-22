

def check_error_exist(dict):
    error = False
    for key, val in dict.items():
        if val == '' or val == 0:
            continue
        else:
            error = True
    return error

