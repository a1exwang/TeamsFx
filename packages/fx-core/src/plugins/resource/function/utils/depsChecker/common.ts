/* eslint-disable @typescript-eslint/no-var-requires */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// NOTE:
// DO NOT EDIT this file in function plugin.
// The source of truth of this file is in packages/vscode-extension/src/debug/depsChecker.
// If you need to edit this file, please edit it in the above folder
// and run the scripts (tools/depsChecker/copyfiles.sh or tools/depsChecker/copyfiles.ps1 according to your OS)
// to copy you changes to function plugin.

import * as os from "os";

export function isWindows(): boolean {
  return os.type() === "Windows_NT";
}

export function isMacOS(): boolean {
  return os.type() === "Darwin";
}

export function isLinux(): boolean {
  return os.type() === "Linux";
}

// help links
export const defaultHelpLink = "https://aka.ms/teamsfx-envchecker-help";

export const nodeNotFoundHelpLink = `${defaultHelpLink}#nodenotfound`;
export const nodeNotSupportedForAzureHelpLink = `${defaultHelpLink}#nodenotsupportedazure-hosting`;
export const nodeNotSupportedForSPFxHelpLink = `${defaultHelpLink}#nodenotsupportedspfx-hosting`;

export const dotnetExplanationHelpLink = `${defaultHelpLink}#overall`;
export const dotnetFailToInstallHelpLink = `${defaultHelpLink}#failtoinstalldotnet`;
export const dotnetManualInstallHelpLink = `${defaultHelpLink}#dotnetnotfound`;
export const dotnetNotSupportTargetVersionHelpLink = `${defaultHelpLink}#dotnetnotsupporttargetversion`;

export const Messages = {
  learnMoreButtonText: "Learn more",
  continueButtonText: "Continue anyway",

  defaultErrorMessage: "Install the required dependencies manually.",

  startInstallFunctionCoreTool: `Downloading and installing @NameVersion.`,
  finishInstallFunctionCoreTool: `Successfully installed @NameVersion.`,
  needReplaceWithFuncCoreToolV3: `You must update to @NameVersion to debug your local functions.`,
  needInstallFuncCoreTool: `You must have @NameVersion installed to debug your local functions.`,
  failToInstallFuncCoreTool: `Failed to install @NameVersion. Install @NameVersion manually.`,
  failToValidateFuncCoreTool: `Failed to validate @NameVersion after installation.`,

  downloadDotnet: `Downloading and installing the portable version of @NameVersion, which will be installed to @InstallDir and will not affect your environment.`,
  finishInstallDotnet: `Successfully installed @NameVersion.`,
  useGlobalDotnet: `Using dotnet from PATH:`,
  dotnetInstallStderr: `dotnet-install command failed without error exit code but with non-empty standard error.`,
  dotnetInstallErrorCode: `dotnet-install command failed.`,
  failToInstallDotnet: `Failed to install @NameVersion. Install @NameVersion manually and restart Visual Studio Code.`,

  NodeNotFound: `Cannot find Node.js.

Teams Toolkit requires Node.js; the recommended version is v14.

Click "Learn more" to learn how to install the Node.js.

(If you just installed Node.js, restart Visual Studio Code for the change to take effect.)`,
  NodeNotSupported: `Node.js (@CurrentVersion) is not in the supported version list (@SupportedVersions).

Click "Learn more" to learn more about the supported Node.js versions.
Click "Continue anyway" to continue local debugging.

(If you just installed Node.js (@SupportedVersions), restart Visual Studio Code for the change to take effect.)`,

  dotnetNotFound: `Cannot find @NameVersion. For the details why .NET SDK is needed, refer to ${dotnetExplanationHelpLink}`,
  depsNotFound: `Cannot find @SupportedPackages.

Teams Toolkit requires these dependencies.

Click "Install" to install @InstallPackages.`,

  linuxDepsNotFound: `Cannot find @SupportedPackages.

Teams Toolkit requires these dependencies. 

Click "Continue anyway" to continue.

(If you just installed @SupportedPackages, restart Visual Studio Code for the change to take effect.)`,

  linuxDepsNotFoundHelpLinkMessage: `Cannot find @SupportedPackages.

Teams Toolkit requires these dependencies.`,
};

export enum DepsCheckerEvent {
  // since FuncToolChecker is disabled and azure functions core tools will be installed as devDependencies now,
  // below events related to FuncToolChecker won't be displayed to end user.
  funcCheckSkipped = "func-check-skipped",
  funcAlreadyInstalled = "func-already-installed",
  funcInstallCompleted = "func-install-completed",
  funcInstallError = "func-install-error",
  funcInstallScriptCompleted = "func-install-script-completed",
  funcInstallScriptError = "func-install-script-error",
  funcValidationError = "func-validation-error",

  dotnetCheckSkipped = "dotnet-check-skipped",
  dotnetAlreadyInstalled = "dotnet-already-installed",
  dotnetInstallCompleted = "dotnet-install-completed",
  dotnetInstallError = "dotnet-install-error",
  dotnetInstallScriptCompleted = "dotnet-install-script-completed",
  dotnetInstallScriptError = "dotnet-install-script-error",
  dotnetValidationError = "dotnet-validation-error",
  dotnetSearchDotnetSdks = "dotnet-search-dotnet-sdks",

  clickLearnMore = "env-checker-click-learn-more",
  clickContinue = "env-checker-click-continue",
  clickCancel = "env-checker-click-cancel",

  nodeNotFound = "node-not-found",
  nodeNotSupportedForAzure = "node-not-supported-for-azure",
  nodeNotSupportedForSPFx = "node-not-supported-for-spfx",

  npmNotFound = "npm-not-found",
  npmAlreadyInstalled = "npm-already-installed",
}

export enum TelemtryMessages {
  failedToInstallFunc = "failed to install Func core tools.",
  failedToValidateFunc = "failed to validate func.",
  NPMNotFound = "npm is not found.",
  failedToExecDotnetScript = "failed to exec dotnet script.",
  failedToValidateDotnet = "failed to validate dotnet.",
  failedToSearchDotnetSdks = "failed to search dotnet sdks.",
}

export enum TelemetryMessurement {
  completionTime = "completion-time",
}
