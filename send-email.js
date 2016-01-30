module.exports = function (RED) {
  var pardot = require('pardot');
  var validator = require('email-validator');

  function SendEmail(config) {
    RED.nodes.createNode(this, config);
    var pardotConfig = RED.nodes.getNode(config.pardotConfig);

    var node = this;
    this.on('input', function (msg) {
      pardot({
        email: pardotConfig.credentials.email,
        password: pardotConfig.credentials.password,
        userKey: pardotConfig.credentials.userKey,
      }).then(function(client) {
        var option = {
          campaign_id: msg.campaignId ? msg.campaignId : config.campaignId,
          email_template_id: msg.emailTemplateId ? msg.emailTemplateId : config.emailTemplateId
        };
        var prospect = msg.prospect ? msg.prospect : config.prospect;
        if (validator.validate(prospect)) {
          option.prospect_email = prospect;
        } else {
          option.prospect_id = prospect;
        }
        return client.email.send(option);
      }).then(function(response) {
        node.send({
          payload: response.email
        });
      }).fail(function(err) {
        node.error(err, JSON.parse(JSON.stringify(err)));
      });
    });
  }

  RED.nodes.registerType("send-email", SendEmail);
}
