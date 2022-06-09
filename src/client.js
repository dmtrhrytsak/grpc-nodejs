const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { promisify } = require('./utils/promisify');

const PORT = 50051;
const PROTO_FILE_PATH = '../proto/notes.proto';

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_FILE_PATH)
);
const grpcObject = grpc.loadPackageDefinition(packageDefinition);

const client = new grpcObject.NoteService(
  `localhost:${PORT}`,
  grpc.credentials.createInsecure()
);

promisify(client);

client.listAsync({}).then(console.log);
