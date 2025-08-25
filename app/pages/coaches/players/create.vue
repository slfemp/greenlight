<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Team } from '~/types'

const router = useRouter()
const toast = useToast()

// Fetch teams for dropdown
const { data: teams } = await useFetch<Team[]>('/api/teams')

const schema = z.object({
  name: z.string().min(2, 'Player name must be at least 2 characters'),
  teamId: z.string().min(1, 'Team is required'),
  position: z.string().min(1, 'Position is required'),
  jerseyNumber: z.string().min(1, 'Jersey number is required'),
  birthDate: z.string().min(1, 'Birth date is required'),
  status: z.enum(['green', 'yellow', 'red']),
  avatar: z.string().optional()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: '',
  teamId: '',
  position: '',
  jerseyNumber: '',
  birthDate: '',
  status: 'green',
  avatar: ''
})

const positions = [
  'Pitcher',
  'Catcher',
  'First Base',
  'Second Base',
  'Third Base',
  'Shortstop',
  'Left Field',
  'Center Field',
  'Right Field'
]

const statusOptions = [
  { label: 'Active (Green)', value: 'green', color: 'success' },
  { label: 'Caution (Yellow)', value: 'yellow', color: 'warning' },
  { label: 'Resting (Red)', value: 'red', color: 'error' }
]

const isSubmitting = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true
  
  try {
    // Here you would normally send the data to your API
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    
    toast.add({
      title: 'Success',
      description: `Player "${event.data.name}" has been created successfully!`,
      color: 'success'
    })
    
    router.push('/coaches/roster')
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to create player. Please try again.',
      color: 'error'
    })
  } finally {
    isSubmitting.value = false
  }
}

function cancel() {
  router.push('/coaches/roster')
}

// Generate a random avatar URL
function generateAvatar() {
  const randomId = Math.floor(Math.random() * 1000)
  state.avatar = `https://i.pravatar.cc/128?u=${randomId}`
}

onMounted(() => {
  generateAvatar()
})
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar title="Create New Player">
        <template #leading>
          <UButton 
            icon="i-lucide-arrow-left" 
            variant="ghost" 
            color="gray"
            @click="cancel"
          >
            Back to Roster
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UCard class="max-w-2xl mx-auto">
        <template #header>
          <div class="flex items-center space-x-2">
            <UIcon name="i-lucide-user-plus" class="w-5 h-5" />
            <h2 class="text-xl font-semibold">Player Information</h2>
          </div>
        </template>

        <UForm 
          :schema="schema" 
          :state="state" 
          class="space-y-6" 
          @submit="onSubmit"
        >
          <!-- Player Avatar & Name -->
          <div class="flex items-start space-x-6">
            <div class="flex-shrink-0">
              <UAvatar 
                :src="state.avatar" 
                :alt="state.name || 'Player'"
                size="xl"
                class="ring-4 ring-gray-200 dark:ring-gray-700"
              />
              <UButton 
                variant="outline" 
                size="xs" 
                class="mt-2 w-full"
                @click="generateAvatar"
              >
                Random Avatar
              </UButton>
            </div>
            
            <div class="flex-1">
              <UFormField label="Player Name" name="name" required>
                <UInput 
                  v-model="state.name" 
                  placeholder="e.g., Alex Smith"
                  icon="i-lucide-user"
                />
              </UFormField>
            </div>
          </div>

          <!-- Team & Position -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Team" name="teamId" required>
              <USelect 
                v-model="state.teamId"
                :options="teams?.map(team => ({ 
                  label: team.name, 
                  value: team.id,
                  avatar: { 
                    style: { backgroundColor: team.primaryColor, color: team.secondaryColor },
                    text: team.abbreviation
                  }
                })) || []"
                placeholder="Select team"
                option-attribute="label"
                value-attribute="value"
              />
            </UFormField>
            
            <UFormField label="Position" name="position" required>
              <USelect 
                v-model="state.position"
                :options="positions.map(p => ({ label: p, value: p }))"
                placeholder="Select position"
              />
            </UFormField>
          </div>

          <!-- Jersey Number & Birth Date -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Jersey Number" name="jerseyNumber" required>
              <UInput 
                v-model="state.jerseyNumber" 
                type="number"
                min="0"
                max="99"
                placeholder="21"
              />
            </UFormField>
            
            <UFormField label="Birth Date" name="birthDate" required>
              <UInput 
                v-model="state.birthDate" 
                type="date"
                :max="new Date().toISOString().split('T')[0]"
              />
            </UFormField>
          </div>

          <!-- Status -->
          <UFormField label="Player Status" name="status" required>
            <URadioGroup 
              v-model="state.status" 
              :options="statusOptions"
              class="flex space-x-4"
            >
              <template #label="{ option }">
                <div class="flex items-center space-x-2">
                  <UBadge :color="option.color" variant="subtle" size="xs">
                    {{ option.label.split(' ')[1] }}
                  </UBadge>
                  <span>{{ option.label.split(' ')[0] }}</span>
                </div>
              </template>
            </URadioGroup>
          </UFormField>

          <!-- Avatar URL (optional) -->
          <UFormField label="Custom Avatar URL (Optional)" name="avatar" help="Leave blank to use random avatar">
            <UInput 
              v-model="state.avatar" 
              placeholder="https://example.com/avatar.jpg"
              icon="i-lucide-image"
            />
          </UFormField>

          <!-- Preview -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Preview</h3>
            <div class="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <div class="flex items-center space-x-3">
                <UAvatar 
                  :src="state.avatar" 
                  :alt="state.name || 'Player'"
                  size="lg"
                />
                <div class="flex-1">
                  <h4 class="text-lg font-semibold">{{ state.name || 'Player Name' }}</h4>
                  <p class="text-sm text-muted">
                    {{ state.position || 'Position' }} • 
                    #{{ state.jerseyNumber || '00' }} • 
                    {{ teams?.find(t => t.id === state.teamId)?.name || 'Team' }}
                  </p>
                  <div class="mt-1 flex justify-center">
                    <StatusIndicator :status="state.status || 'green'" size="sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3 pt-6 border-t">
            <UButton 
              type="button" 
              color="gray" 
              variant="ghost"
              @click="cancel"
            >
              Cancel
            </UButton>
            <UButton 
              type="submit" 
              color="primary"
              :loading="isSubmitting"
              :disabled="isSubmitting"
            >
              Create Player
            </UButton>
          </div>
        </UForm>
      </UCard>
    </template>
  </UDashboardPanel>
</template>
