# PyPoll-cloud

The two folders in this repo include the backend and the frontend fo PyPoll-cloud.

Someone can access PyPoll-cloud using PyPoll.

```python
from pypoll import SDK

sdk = SDK("localhost:8000")
sdk.sign_up("test@test.te", "123", "test", "test") # Register to PyPoll-cloud
sdk.sign_in("test@test.te", "123") # Sigh in to PyPoll-cloud 
sdk.upload_graph("AOZ.gexf")
```
