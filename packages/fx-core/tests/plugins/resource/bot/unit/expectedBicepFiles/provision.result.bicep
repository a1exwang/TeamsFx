// Resources for bot
module botProvision './botProvision.result.bicep' = {
  name: 'botProvision'
  params: {
    provisionParameters: provisionParameters
    userAssignedIdentityId: userAssignedIdentityProvision.outputs.identityResourceId
  }
}

output botOutput object = {
  teamsFxPluginId: 'fx-resource-bot'
  skuName: botProvision.outputs.botWebAppSKU
  siteName: botProvision.outputs.botWebAppName
  validDomain: botProvision.outputs.botDomain
  appServicePlanName: botProvision.outputs.appServicePlanName
  botChannelRegName: botProvision.outputs.botServiceName
  botWebAppResourceId: botProvision.outputs.botWebAppResourceId
  siteEndpoint: botProvision.outputs.botWebAppEndpoint
}
