const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PORT = 50051;
const PROTO_FILE_PATH = '../proto/notes.proto';

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_FILE_PATH)
);
const grpcObject = grpc.loadPackageDefinition(packageDefinition);

const notes = [
  { id: 1, title: 'Note 1', description: 'Content 1' },
  { id: 2, title: 'Note 2', description: 'Content 2' },
];

const server = new grpc.Server();

function List(_, callback) {
  return callback(null, { notes });
}

function Find({ request: { id } }, callback) {
  const note = notes.find((note) => note.id === id);

  if (!note) return callback(new Error('Not found'), null);

  return callback(null, { note });
}

server.addService(grpcObject.NoteService.service, { List, Find });

server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
    console.log(`Server stared on port ${PORT}`);
  }
);
