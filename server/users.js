const createUsersCollection = async () => {
    try {
      await mongoose.connection.createCollection('users', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'email', 'password', 'isAdmin'],
            properties: {
              name: {
                bsonType: 'string',
                description: 'must be a string and is required'
              },
              email: {
                bsonType: 'string',
                description: 'must be a string and is required'
              },
              password: {
                bsonType: 'string',
                description: 'must be a string and is required'
              },
              isAdmin: {
                bsonType: 'bool',
                description: 'must be a boolean and is required'
              }
            }
          }
        },
        validationLevel: 'strict',
        validationAction: 'error'
      });
      console.log('Users collection created');
    } catch (error) {
      console.error('Error creating users collection:', error);
    }
  };
  