import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className'

// Xóa classname mặc định của material ui
ClassNameGenerator.configure((componentName) => componentName.replace('Mui', ''))