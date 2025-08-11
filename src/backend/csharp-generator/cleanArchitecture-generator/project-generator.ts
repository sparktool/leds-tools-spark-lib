import { expandToStringWithNL, Model } from "../../models/model.js";
import fs from "fs";
import path from "path";

export function generate(model: Model, target_folder: string) : void {

    fs.writeFileSync(path.join(target_folder, model.configuration?.name + ".sln"), generateProjectsln(model))

}

function generateProjectsln(model: Model) : string {
    return expandToStringWithNL`Microsoft Visual Studio Solution File, Format Version 12.00
# Visual Studio Version 17
VisualStudioVersion = 17.8.34525.116
MinimumVisualStudioVersion = 10.0.40219.1
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "${model.configuration?.name}.Domain", "${model.configuration?.name}.Domain\\${model.configuration?.name}.Domain.csproj", "{DOMAIN-GUID}"
EndProject
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "${model.configuration?.name}.Application", "${model.configuration?.name}.Application\\${model.configuration?.name}.Application.csproj", "{APP-GUID}"
EndProject
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "${model.configuration?.name}.Infrastructure", "${model.configuration?.name}.Infrastructure\\${model.configuration?.name}.Infrastructure.csproj", "{INFRA-GUID}"
EndProject
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "${model.configuration?.name}.WebAPI", "${model.configuration?.name}.WebAPI\\${model.configuration?.name}.WebAPI.csproj", "{WEB-GUID}"
EndProject
Project("{E53339B2-1760-4266-BCC7-CA923CBCF16C}") = "docker-compose", "docker-compose.dcproj", "{COMPOSE-GUID}"
EndProject
Project("{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}") = "${model.configuration?.name}.Domain.Test", "${model.configuration?.name}.Domain.Test\\${model.configuration?.name}.Domain.Test.csproj", "{TEST-GUID}"
EndProject
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "${model.configuration?.name}.Infrastructure.Test", "${model.configuration?.name}.Infrastructure.Test\\${model.configuration?.name}.Infrastructure.Test.csproj", "{INFRA-TEST-GUID}"
EndProject
Global
	GlobalSection(SolutionConfigurationPlatforms) = preSolution
		Debug|Any CPU = Debug|Any CPU
		Release|Any CPU = Release|Any CPU
	EndGlobalSection
	GlobalSection(ProjectConfigurationPlatforms) = postSolution
		{DOMAIN-GUID}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{DOMAIN-GUID}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{DOMAIN-GUID}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{DOMAIN-GUID}.Release|Any CPU.Build.0 = Release|Any CPU
		{APP-GUID}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{APP-GUID}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{APP-GUID}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{APP-GUID}.Release|Any CPU.Build.0 = Debug|Any CPU
		{INFRA-GUID}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{INFRA-GUID}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{INFRA-GUID}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{INFRA-GUID}.Release|Any CPU.Build.0 = Release|Any CPU
		{WEB-GUID}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{WEB-GUID}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{WEB-GUID}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{WEB-GUID}.Release|Any CPU.Build.0 = Release|Any CPU
		{COMPOSE-GUID}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{COMPOSE-GUID}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{COMPOSE-GUID}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{COMPOSE-GUID}.Release|Any CPU.Build.0 = Release|Any CPU
		{TEST-GUID}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{TEST-GUID}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{TEST-GUID}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{TEST-GUID}.Release|Any CPU.Build.0 = Release|Any CPU
		{INFRA-TEST-GUID}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{INFRA-TEST-GUID}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{INFRA-TEST-GUID}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{INFRA-TEST-GUID}.Release|Any CPU.Build.0 = Release|Any CPU
	EndGlobalSection
	GlobalSection(SolutionProperties) = preSolution
		HideSolutionNode = FALSE
	EndGlobalSection
	GlobalSection(NestedProjects) = preSolution
	EndGlobalSection
	GlobalSection(ExtensibilityGlobals) = postSolution
		SolutionGuid = {69766354-AE61-479C-B6D7-C8FFA3931E1F}
	EndGlobalSection
EndGlobal`
}