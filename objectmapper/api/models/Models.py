from neomodel import StructuredNode, StringProperty, RelationshipTo, RelationshipFrom


class User(StructuredNode):
    user_id = StringProperty(unique_index=True)
    accounts = RelationshipTo('Account', 'ACCOUNT')

class Institution(StructuredNode):
    id = StringProperty(unique_index=True)
    name = StringProperty(unique_index=True)
    color = StringProperty(unique_index=True)
    logo = StringProperty(unique_index=True)
    link = StringProperty(unique_index=True)
    account = RelationshipTo('Account', 'INSTITUTION')

class Account(StructuredNode):
    account_number = StringProperty(unique_index=True)
    account_name = StringProperty(unique_index=True)
    type = StringProperty(unique_index=True)
    subtype = StringProperty(unique_index=True)
    balance = StringProperty(unique_index=True)
    user = RelationshipFrom('User', 'USER')
    institution = RelationshipFrom('Institution', 'INSTITUTION')

class Transactions(StructuredNode):
    title = StringProperty(unique_index=True)
    author = RelationshipTo('Author', 'AUTHOR')

class Balance(StructuredNode):
    name = StringProperty(unique_index=True)
    books = RelationshipFrom('Book', 'AUTHOR')
    
class Name(StructuredNode):
    title = StringProperty(unique_index=True)
    author = RelationshipTo('Author', 'AUTHOR')

class Address(StructuredNode):
    name = StringProperty(unique_index=True)
    books = RelationshipFrom('Book', 'AUTHOR')

class PhoneNumber(StructuredNode):
    title = StringProperty(unique_index=True)
    author = RelationshipTo('Author', 'AUTHOR')

class Email(StructuredNode):
    name = StringProperty(unique_index=True)
    books = RelationshipFrom('Book', 'AUTHOR')


harry_potter = Book(title='Harry potter and the..').save()
rowling =  Author(name='J. K. Rowling').save()
harry_potter.author.connect(rowling)