import { EStatus } from "./IProductPipeline";

export interface IPipelineRun {
  name: string;
  started:number;
  status:EStatus;
  taskStatus:number;
  duration:number;
  trigger:string;
 }
