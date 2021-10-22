// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AzureAccountProvider,
  AzureSolutionSettings,
  Func,
  FxError,
  Inputs,
  Json,
  ok,
  OptionItem,
  QTreeNode,
  Result,
  SingleSelectQuestion,
  StaticOptions,
  TokenProvider,
  v2,
  Void,
} from "@microsoft/teamsfx-api";
import {
  Context,
  DeploymentInputs,
  ProvisionInputs,
  ResourcePlugin,
  ResourceProvisionOutput,
  ResourceTemplate,
} from "@microsoft/teamsfx-api/build/v2";
import { StaticOption } from "@microsoft/teamsfx-api/src/qm/question";
import { Inject, Service } from "typedi";
import { FrontendPlugin } from "../..";
import { WebFrameworkQuestion } from "../../../solution/fx-solution/question";
import {
  ResourcePlugins,
  ResourcePluginsV2,
} from "../../../solution/fx-solution/ResourcePluginContainer";
import {
  configureResourceAdapter,
  deployAdapter,
  executeUserTaskAdapter,
  generateResourceTemplateAdapter,
  provisionResourceAdapter,
  scaffoldSourceCodeAdapter,
} from "../../utils4v2";

@Service(ResourcePluginsV2.FrontendPlugin)
export class FrontendPluginV2 implements ResourcePlugin {
  name = "fx-resource-frontend-hosting";
  displayName = "Tab Front-end";
  @Inject(ResourcePlugins.FrontendPlugin)
  plugin!: FrontendPlugin;

  activate(solutionSettings: AzureSolutionSettings): boolean {
    return solutionSettings.webFramework === "React";
  }

  async scaffoldSourceCode(ctx: Context, inputs: Inputs): Promise<Result<Void, FxError>> {
    return await scaffoldSourceCodeAdapter(ctx, inputs, this.plugin);
  }

  async generateResourceTemplate(
    ctx: Context,
    inputs: Inputs
  ): Promise<Result<ResourceTemplate, FxError>> {
    return await generateResourceTemplateAdapter(ctx, inputs, this.plugin);
  }

  async provisionResource(
    ctx: Context,
    inputs: ProvisionInputs,
    envInfo: Readonly<v2.EnvInfoV2>,
    tokenProvider: TokenProvider
  ): Promise<Result<ResourceProvisionOutput, FxError>> {
    return provisionResourceAdapter(ctx, inputs, envInfo, tokenProvider, this.plugin);
  }

  async configureResource(
    ctx: Context,
    inputs: ProvisionInputs,
    envInfo: Readonly<v2.EnvInfoV2>,
    tokenProvider: TokenProvider
  ): Promise<Result<ResourceProvisionOutput, FxError>> {
    return await configureResourceAdapter(ctx, inputs, envInfo, tokenProvider, this.plugin);
  }

  async deploy(
    ctx: Context,
    inputs: DeploymentInputs,
    provisionOutput: Json,
    tokenProvider: AzureAccountProvider
  ): Promise<Result<Void, FxError>> {
    return await deployAdapter(ctx, inputs, provisionOutput, tokenProvider, this.plugin);
  }

  async executeUserTask(
    ctx: Context,
    inputs: Inputs,
    func: Func,
    localSettings: Json,
    envInfo: v2.EnvInfoV2,
    tokenProvider: TokenProvider
  ): Promise<Result<unknown, FxError>> {
    return await executeUserTaskAdapter(
      ctx,
      inputs,
      func,
      localSettings,
      envInfo,
      tokenProvider,
      this.plugin
    );
  }

  async extendQuestionsForScaffold(
    ctx: Context,
    inputs: Inputs,
    node: QTreeNode
  ): Promise<Result<Void, FxError>> {
    if (node.data.type === "singleSelect" && node.data.name === WebFrameworkQuestion.name) {
      const question = node.data as SingleSelectQuestion;
      const item: StaticOption = {
        id: "React",
        label: "React web",
        cliName: "react",
      };
      question.staticOptions.push(item);
    }
    return ok(Void);
  }
}
