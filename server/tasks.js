const createTasksCollection = async () => {
    try {
      await mongoose.connection.createCollection('tasks', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['title', 'status', 'assignedTo', 'assignedBy'],
            properties: {
              title: {
                bsonType: 'string',
                description: 'must be a string and is required'
              },
              description: {
                bsonType: 'string',
                description: 'must be a string'
              },
              status: {
                bsonType: 'string',
                enum: ['pending', 'in-progress', 'completed'],
                description: 'must be one of enum values and is required'
              },
              assignedTo: {
                bsonType: 'objectId',
                description: 'must be an ObjectId and is required'
              },
              assignedBy: {
                bsonType: 'objectId',
                description: 'must be an ObjectId and is required'
              }
            }
          }
        },
        validationLevel: 'strict',
        validationAction: 'error'
      });
      console.log('Tasks collection created');
    } catch (error) {
      console.error('Error creating tasks collection:', error);
    }
  };
  