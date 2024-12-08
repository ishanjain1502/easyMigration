# Why I took the decisions I took????

### For loggin was going to impliment a watch on DB, to  record all transactions, but then rejected the idea.
> Reason was simple, I am expecting users to have an active service, in that case, if I record all transaction then my migration related transactions will get lost in between total transactions, then rollback purpose will be lost

## For Undoing Migration
> There are multiple ways that are bombarding my mind, and I cant think of anyone particular, so will start with first principle mechanishm.<br/><br/>
> Will create a clone of required collections before migration in a saperate file and a clone of collection of required collection after migration with some migration versioning, so that it can be used for reverting back.<br/><br/>
> A edgecase that came in my mind can be, when migration is used to create a new collection, then in that case, umdiong will require us to delete the newly created collection, which cant be done by overwriting the existing collections.<br/><br/>
> Will think a little more about it.