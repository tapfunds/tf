from neomodel import StructuredNode, StringProperty, RelationshipTo, RelationshipFrom

class User(StructuredNode):
    user_id = StringProperty(unique_index=True)
    accounts = RelationshipTo('Account', 'ACCOUNT')

class Institution(StructuredNode):
    id = StringProperty()
    name = StringProperty(unique_index=True)
    color = StringProperty()
    logo = StringProperty()
    link = StringProperty()
    accounts = RelationshipTo('Account', 'ACCOUNT')

class Account(StructuredNode):
    account_number = StringProperty(unique_index=True)
    account_name = StringProperty()
    type = StringProperty()
    subtype = StringProperty()
    # balance = StringProperty()
    user = RelationshipFrom('User', 'ACCOUNT')
    institution = RelationshipFrom('Institution', 'INSTITUTION')
    name = RelationshipTo('Name', 'NAME')
    address = RelationshipTo('Address', 'ADDRESS')
    phone_number = RelationshipTo('PhoneNumber', 'PHONENUMBER')
    email = RelationshipTo('Email', 'EMAIL')

class Transactions(StructuredNode):
    merchant_name = StringProperty()
    location = StringProperty()
    amount = StringProperty()
    date = StringProperty()
    currency = StringProperty()
    payment_channel = StringProperty()
    amount = StringProperty()
    pending = StringProperty()
    name = StringProperty()
    institution = RelationshipFrom('Account', 'ACCOUNT')

class Balance(StructuredNode):
    balance = StringProperty(unique_index=True)
    account = RelationshipFrom('Account', 'BALANCE')
    
class Name(StructuredNode):
    name = StringProperty()
    account = RelationshipTo('Account', 'NAME')

class Address(StructuredNode):
    address = StringProperty()
    account = RelationshipFrom('Account', 'ADDRESS')

class PhoneNumber(StructuredNode):
    phone_number = StringProperty()
    account = RelationshipTo('Account', 'PHONENUMBER')

class Email(StructuredNode):
    email = StringProperty()
    account = RelationshipFrom('Account', 'EMAIL')