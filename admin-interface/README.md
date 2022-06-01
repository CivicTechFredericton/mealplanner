## Build/Deploy application

```
parcel build ./src/html/index.html
aws --profile civtech s3 sync --acl public-read ./dist/ s3://meal-planner-admin
```