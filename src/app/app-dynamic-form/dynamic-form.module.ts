import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionControlService } from './core/question-control-service';
import { DynamicFormComponent, DynamicFormQuestionComponent } from 'app/app-dynamic-form/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ 
    DynamicFormComponent, 
    DynamicFormQuestionComponent
    ],
    exports: [
      DynamicFormComponent, 
      DynamicFormQuestionComponent
    ],
    providers: [QuestionControlService]
})
export class DynamicFormModule { }