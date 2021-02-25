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
    user = RelationshipFrom('User', 'ACCOUNT')
    institution = RelationshipFrom('Institution', 'INSTITUTION')
    name = RelationshipTo('Name', 'NAME')
    phone_number = RelationshipTo('PhoneNumber', 'PHONENUMBER')
    address = RelationshipTo('Address', 'ADDRESS')
    email = RelationshipTo('Email', 'EMAIL')

class Transactions(StructuredNode):
    merchant_name = StringProperty(unique_index=True)
    location = StringProperty(unique_index=True)
    amount = StringProperty(unique_index=True)
    date = StringProperty(unique_index=True)
    currency = StringProperty(unique_index=True)
    payment_channel = StringProperty(unique_index=True)
    amount = StringProperty(unique_index=True)
    pending = StringProperty(unique_index=True)
    name = StringProperty(unique_index=True)
    institution = RelationshipFrom('Account', 'ACCOUNT')

class Balance(StructuredNode):
    balance = StringProperty(unique_index=True)
    account = RelationshipFrom('Account', 'BALANCE')
    
class Name(StructuredNode):
    name = StringProperty(unique_index=True)
    account = RelationshipTo('Account', 'NAME')

class Address(StructuredNode):
    address = StringProperty(unique_index=True)
    account = RelationshipFrom('Account', 'ADDRESS')

class PhoneNumber(StructuredNode):
    phone_number = StringProperty(unique_index=True)
    account = RelationshipTo('Account', 'PHONENUMBER')

class Email(StructuredNode):
    email = StringProperty(unique_index=True)
    account = RelationshipFrom('Account', 'EMAIL')


harry_potter = Book(title='Harry potter and the..').save()
rowling =  Author(name='J. K. Rowling').save()
harry_potter.author.connect(rowling)