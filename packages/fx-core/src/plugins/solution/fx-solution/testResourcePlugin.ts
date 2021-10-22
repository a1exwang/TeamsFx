// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  AzureSolutionSettings,
  FxError,
  Inputs,
  ok,
  QTreeNode,
  Result,
  SingleSelectQuestion,
  StaticOption,
  v2,
  Void,
} from "@microsoft/teamsfx-api";
import "reflect-metadata";
import { Service } from "typedi";
import { WebFrameworkQuestion } from "./question";
import { ResourcePluginsV2 } from "./ResourcePluginContainer";

@Service(ResourcePluginsV2.MyTestPlugin)
export class MyWebScaffoldPlugin implements v2.ResourcePlugin {
  name = "fx-azure-test";
  displayName = "My Test Resource Plugin";
  activate(solutionSettings: AzureSolutionSettings): boolean {
    return solutionSettings.webFramework === "MyFramework";
  }
  async scaffoldSourceCode(ctx: v2.Context, inputs: Inputs): Promise<Result<Void, FxError>> {
    return ok(Void);
  }
  async extendQuestionsForScaffold(
    ctx: v2.Context,
    inputs: Inputs,
    node: QTreeNode
  ): Promise<Result<Void, FxError>> {
    if (node.data.type === "singleSelect" && node.data.name === WebFrameworkQuestion.name) {
      const question = node.data as SingleSelectQuestion;
      const item: StaticOption = {
        id: "MyFramework",
        label: "My Web Framework",
        cliName: "myframework",
      };
      question.staticOptions.push(item);
    }
    return ok(Void);
  }
}
