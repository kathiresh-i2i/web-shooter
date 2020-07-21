import * as angular from 'angular';
export const PreviewComponent: angular.IComponentOptions  = {
    template: `
    <section layout="row" layout-sm="column" layout-align="center center" layout-wrap>
      <md-button class="md-raised">Button</md-button>
      <md-button class="md-raised md-primary">Primary</md-button>
      <md-button ng-disabled="true" class="md-raised md-primary">Disabled</md-button>
      <md-button class="md-raised md-warn">Warn</md-button>
      <div class="label">Raised</div>
    </section>
    <md-divider></md-divider>
    `
  };