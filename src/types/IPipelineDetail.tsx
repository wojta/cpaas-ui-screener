import { IPipelineRun } from "./IPipelineRun";

export interface IYaml {
  filename:string,
  content:string
}

export interface IPipelineDetail {
  name: string;
  namespace: string;
  labels: string[];
  annotations: string[];
  timestamp: number;
  yaml: IYaml[];
  pipelineRuns: IPipelineRun[];
}
