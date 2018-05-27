self.addEventListener('install', function(event) {
  console.log("sw: install");
});

self.addEventListener('fetch', function(event) {
  console.log("sw: fetch");
});
