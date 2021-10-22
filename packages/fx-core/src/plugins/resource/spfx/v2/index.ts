// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AzureAccountProvider,
  AzureSolutionSettings,
  FxError,
  Inputs,
  Json,
  ok,
  QTreeNode,
  Result,
  SingleSelectQuestion,
  Void,
} from "@microsoft/teamsfx-api";
import { Context, DeploymentInputs, ResourcePlugin } from "@microsoft/teamsfx-api/build/v2";
import { Inject, Service } from "typedi";
import {
  SpfxFrameworkQuestion,
  SpfxPlugin,
  SpfxWebpartDespQuestion,
  SpfxWebpartQuestion,
} from "../..";
import { HostTypeOptionSPFx, WebFrameworkQuestion } from "../../../solution/fx-solution/question";
import {
  ResourcePlugins,
  ResourcePluginsV2,
} from "../../../solution/fx-solution/ResourcePluginContainer";
import {
  deployAdapter,
  getQuestionsForScaffoldingAdapter,
  scaffoldSourceCodeAdapter,
} from "../../utils4v2";

@Service(ResourcePluginsV2.SpfxPlugin)
export class SpfxPluginV2 implements ResourcePlugin {
  name = "fx-resource-spfx";
  displayName = "SharePoint Framework (SPFx)";
  @Inject(ResourcePlugins.SpfxPlugin)
  plugin!: SpfxPlugin;

  activate(solutionSettings: AzureSolutionSettings): boolean {
    // return this.plugin.activate(solutionSettings);
    return solutionSettings.webFramework === HostTypeOptionSPFx.id;
  }

  async getQuestionsForScaffolding(
    ctx: Context,
    inputs: Inputs
  ): Promise<Result<QTreeNode | undefined, FxError>> {
    return await getQuestionsForScaffoldingAdapter(ctx, inputs, this.plugin);
  }
  async extendQuestionsForScaffold(
    ctx: Context,
    inputs: Inputs,
    node: QTreeNode
  ): Promise<Result<Void, FxError>> {
    if (node.data.type === "singleSelect" && node.data.name === WebFrameworkQuestion.name) {
      const question = node.data as SingleSelectQuestion;
      question.staticOptions.push(HostTypeOptionSPFx);
      const group = new QTreeNode({
        type: "group",
      });
      group.condition = { equals: HostTypeOptionSPFx.id };
      group.addChild(new QTreeNode(SpfxFrameworkQuestion));
      group.addChild(new QTreeNode(SpfxWebpartQuestion));
      group.addChild(new QTreeNode(SpfxWebpartDespQuestion));
      node.addChild(group);
    }
    return ok(Void);
  }
  async scaffoldSourceCode(ctx: Context, inputs: Inputs): Promise<Result<Void, FxError>> {
    return await scaffoldSourceCodeAdapter(ctx, inputs, this.plugin);
  }

  async deploy(
    ctx: Context,
    inputs: DeploymentInputs,
    provisionOutput: Json,
    tokenProvider: AzureAccountProvider
  ): Promise<Result<Void, FxError>> {
    return await deployAdapter(ctx, inputs, provisionOutput, tokenProvider, this.plugin);
  }
}
