from graphene import String, ObjectType

class AccountType(ObjectType):
  id = String(required=True)
  title = String(required=True)
  instructor = String(required=True)
  publish_date = String()
  
   