import { IPipelineDetail } from 'src/types/IPipelineDetail';
import moment from 'moment';
import * as uuidv4 from 'uuid/v4';
import { EStatus } from 'src/types/IProductPipeline';

export const pipelineDetail: IPipelineDetail = {
  name: 'pipeline01',
  namespace: 'project01',
  labels: ['app=dummy-mongo-pod-test', 'bap.me/environment=dev', 'bap.me/tier=backend', 'bap.me/track=experimental'],
  annotations: [],
  timestamp: moment('201908091600', 'YYYYMMDDhhmm').milliseconds(),
  yaml: [
    {
      filename: 'release.yml',
      content: `---
    infra:
      clouds:
        openshift:
          name-space:
            # server-url:

    release:
      - name: 'Container-native virtualization-cpaas-mvp'
        timeout: 180
        trigger:
          timed: 'H H(22-23) * * 1'
        dry-run: no
        mailer:
          recipients: 'enatan@redhat.com'
          skipmail: no
          notify-component-owner-on-success: yes
        pipeline:
          - name: 'cnv_pipeline_job_1'
            tools:
              - name: comet
                help: |
                  https://comet.engineering.redhat.com/containers/repositories/create/delivery
                productline: 'cnv-cpaas-mvp-tech-preview'
                repository-content-structure: 'single content stream'
                release-no-a-grade-containers: yes
              - name: errata
                help: |
                  https://errata.devel.redhat.com
                arrange-erratas: 'type-a'
                workflow-rule: no                                          # unset
                enable-advisories: yes
                enable-batching: yes
                blocker-flag: no
              - name: greenwave
                decision_context: cnv_default
                # product_version: cnv-1.4-cpaas-mvp
                verbose: true
                subject:
                  - item: # nvr goes here
                    type: koji_build
            qe:
              enable-check: yes
              results-location: 'link_to_log_repo'`
    },
    {
      filename: 'product.yml',
      content: `---
    product:
      name: 'Container-native virtualization-cpaas-mvp'
      product-page: 'https://pp.engineering.redhat.com/pp/product/cnv/'
      release:
        type: 'Y-stream'
        version: 'CNV 1.4'
      projects:
        - name: kubevirt
          components:
            - type: containers
              name: cnv-libvirt-cpaas-mvp
              image-type: layered
              build:
                - brew-tag: cnv-1.4-cpaas-mvp-rhel-7
                  product-version: RHEL-7-CNV-1.4-CPAAS-MVP
              owner: 'ena@redhat.com'
              build-flags: ''
              host-level-access: unprivileged
              display-name: cnv-libvirt-cpaas-mvp
              description: 'Libvirt and QEMU wrapper container'
              summary: 'Libvirt and QEMU wrapper container'
              priority: 1
            - type: containers
              name: virt-launcher-cpaas-mvp
              image-type: layered
              build:
                - brew-tag: cnv-1.4-cpaas-mvp-rhel-7
                  product-version: RHEL-7-CNV-1.4-CPAAS-MVP
              owner: 'ena@redhat.com'
              build-flags: ''
              host-level-access: unprivileged
              display-name: virt-launcher-cpaas-mvp
              description: 'Container-native virtualization Virtual Machine launcher'
              summary: 'Container-native virtualization Virtual Machine launcher'
              priority: 2
            - type: rpms
              name: kubevirt-cpaas-mvp
              build:
                - brew-tag: cnv-1.4-cpaas-mvp-rhel-7
                  product-version: RHEL-7-CNV-1.4-CPAAS-MVP
              owner: 'ena@redhat.com'
              build-flags: ''
              display-name: kubevirt-cpaas-mvp
              description: "Kubevirt rpm"
              priority: 1
            - type: apbs
              name: kubevirt-apb-cpaas-mvp
              image-type: apb
              build:
                - brew-tag: cnv-1.4-cpaas-mvp-rhel-7
                  product-version: RHEL-7-CNV-1.4-CPAAS-MVP
              owner: 'ena@redhat.com'
              build-flags: ''
              host-level-access: unprivileged
              display-name: kubevirt-apb-cpaas-mvp
              description: 'Kubevirt APB'
              summary: 'Kubevirt APB'
              priority: 1
        - name: containerized-data-importer
          owner: 'ena@redhat.com'
          components:
            - type: containers
              name: virt-cdi-controller-cpaas-mvp
              image-type: layered
              build:
                - brew-tag: cnv-1.4-cpaas-mvp-rhel-7
                  product-version: RHEL-7-CNV-1.4-CPAAS-MVP
              build-flags: ''
              host-level-access: unprivileged
              display-name: virt-cdi-controller-cpaas-mvp
              description: 'Container-native virtualization Data Importer controller'
              summary: 'Container-native virtualization Data Importer controller'
              priority: 1`
    }
  ],
  pipelineRuns:[
    {
      name: uuidv4(),
      started: moment().subtract(2,"minutes").milliseconds(),
      status: EStatus.FAILED,
      taskStatus: -1,
      duration: moment.duration(3, 'seconds')
    },
    {
      name: uuidv4(),
      started: moment().subtract(7,"minutes").milliseconds(),
      status: EStatus.SUCCEDED,
      taskStatus: 100,
      duration: moment.duration(5, 'minutes')
    },
    {
      name: uuidv4(),
      started: moment().subtract(20,"minutes").milliseconds(),
      status: EStatus.SUCCEDED,
      taskStatus: 100,
      duration:  moment.duration(15, 'minutes')
    },
    {
      name: uuidv4(),
      started: moment().subtract(25,"minutes").milliseconds(),
      status: EStatus.RUNNING,
      taskStatus: 50,
      duration: moment.duration(25, 'minutes')
    }
  ]
};
