// import { defineAsyncComponent } from 'vue'
import {
  LeftOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  BorderInnerOutlined,
  CopyOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  RightOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'
export function requireAntIcons(app) {
  app.component('LeftOutlined', LeftOutlined)
  app.component('ExclamationCircleOutlined', ExclamationCircleOutlined)
  app.component('CloseCircleOutlined', CloseCircleOutlined)
  app.component('EditOutlined', EditOutlined)
  app.component('BorderInnerOutlined', BorderInnerOutlined)
  app.component('CopyOutlined', CopyOutlined)
  app.component('CloseOutlined', CloseOutlined)
  app.component('CheckCircleOutlined', CheckCircleOutlined)
  app.component('RightOutlined', RightOutlined)
  app.component('DeleteOutlined', DeleteOutlined)
}
