from neomodel import StructuredNode, StringProperty, RelationshipTo, RelationshipFrom

class User(StructuredNode):
    user_id = StringProperty(unique_index=True)
    accounts = RelationshipTo('Account', 'ACCOUNT')

class Institution(StructuredNode):
    insti_id = StringProperty()
    name = StringProperty()
    color = StringProperty()
    logo = StringProperty()
    link = StringProperty()
    accounts = RelationshipTo('Account', 'ACCOUNT')

class Account(StructuredNode):
    account_id = StringProperty(unique_index=True)
    account_name = StringProperty()
    type = StringProperty()
    subtype = StringProperty()
    # balance = StringProperty()
    user = RelationshipFrom('User', 'ACCOUNT')
    institution = RelationshipFrom('Institution', 'ACCOUNT')
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
    city = StringProperty()
    region = StringProperty()
    street = StringProperty()
    postal_code = StringProperty()
    country = StringProperty()
    account = RelationshipFrom('Account', 'ADDRESS')

class PhoneNumber(StructuredNode):
    data = StringProperty()
    primary = StringProperty()
    type = StringProperty()
    account = RelationshipTo('Account', 'PHONENUMBER')

class Email(StructuredNode):
    data = StringProperty()
    primary = StringProperty()
    type = StringProperty()
    account = RelationshipFrom('Account', 'EMAIL')