export type Database = {
  public: {
    Tables: {
      home_content: {
        Row: {
          id: string
          component_type: 'hero' | 'children' | 'services'
          content: {
            slides?: Array<{
              image: string
              title: string
              subtitle: string
              cta: string
              link: string
            }>
            title?: string
            description?: string
            imageUrl?: string
            services?: Array<{
              title: string
              time: string
              description: string
              icon?: string
            }>
          }
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          component_type: 'hero' | 'children' | 'services'
          content: any
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          component_type?: 'hero' | 'children' | 'services'
          content?: any
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}