export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "communitycblfeb20224bb205e1": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "function": {
        "photoProcessing": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "storage": {
        "photos": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}