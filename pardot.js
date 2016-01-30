module.exports = function(RED) {
  function Pardot(n) {
    RED.nodes.createNode(this, n);
    this.name = n.name;
    this.email = n.email;
    this.password = n.password;
    this.userKey = n.userKey;
  }
  RED.nodes.registerType(
    "pardot",
    Pardot,
    {
      credentials: {
        email: {type: "text"},
        password: {type: "password"},
        userKey: {type: "password"}
      }
    }
  );
}