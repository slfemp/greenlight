<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Team } from '~/types'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const teamId = route.params.id as string

// Fetch team data
const { data: teams } = await useFetch<Team[]>('/api/teams')
const team = computed(() => teams.value?.find(t => t.id === teamId))

if (!team.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Team not found'
  })
}

const schema = z.object({
  name: z.string().min(2, 'Team name must be at least 2 characters'),
  abbreviation: z.string().min(2, 'Abbreviation must be at least 2 characters').max(5, 'Abbreviation must be 5 characters or less'),
  division: z.string().min(1, 'Division is required'),
  coach: z.string().min(2, 'Coach name must be at least 2 characters'),
  homeField: z.string().min(2, 'Home field must be at least 2 characters'),
  established: z.string().min(4, 'Year established is required'),
  primaryColor: z.string().min(4, 'Primary color is required'),
  secondaryColor: z.string().min(4, 'Secondary color is required')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: team.value.name,
  abbreviation: team.value.abbreviation,
  division: team.value.division,
  coach: team.value.coach,
  homeField: team.value.homeField,
  established: team.value.established,
  primaryColor: team.value.primaryColor,
  secondaryColor: team.value.secondaryColor
})

const divisions = [
  'North',
  'South', 
  'East',
  'West',
  'Central'
]

const isSubmitting = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true
  
  try {
    // Here you would normally send the data to your API
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    
    toast.add({
      title: 'Success',
      description: `Team "${event.data.name}" has been updated successfully!`,
      color: 'success'
    })
    
    router.push('/coaches/teams')
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to update team. Please try again.',
      color: 'error'
    })
  } finally {
    isSubmitting.value = false
  }
}

function cancel() {
  router.push('/coaches/teams')
}

function deleteTeam() {
  // Add delete confirmation logic here
  toast.add({
    title: 'Delete functionality',
    description: 'Delete team functionality would be implemented here',
    color: 'warning'
  })
}
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar :title="`Edit ${team?.name}`">
        <template #leading>
          <UButton 
            icon="i-lucide-arrow-left" 
            variant="ghost" 
            color="gray"
            @click="cancel"
          >
            Back to Teams
          </UButton>
        </template>

        <template #right>
          <UButton 
            icon="i-lucide-trash" 
            color="error"
            variant="outline"
            @click="deleteTeam"
          >
            Delete Team
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UCard class="max-w-2xl mx-auto">
        <template #header>
          <div class="flex items-center space-x-2">
            <UIcon name="i-lucide-edit" class="w-5 h-5" />
            <h2 class="text-xl font-semibold">Edit Team Information</h2>
          </div>
        </template>

        <UForm 
          :schema="schema" 
          :state="state" 
          class="space-y-6" 
          @submit="onSubmit"
        >
          <!-- Team Name & Abbreviation -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Team Name" name="name" required>
              <UInput 
                v-model="state.name" 
                placeholder="e.g., Green Light Legends"
                icon="i-lucide-users"
              />
            </UFormField>
            
            <UFormField label="Abbreviation" name="abbreviation" required>
              <UInput 
                v-model="state.abbreviation" 
                placeholder="e.g., GLL"
                :maxlength="5"
                class="uppercase"
              />
            </UFormField>
          </div>

          <!-- Division & Coach -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Division" name="division" required>
              <USelect 
                v-model="state.division"
                :options="divisions.map(d => ({ label: d, value: d }))"
                placeholder="Select division"
              />
            </UFormField>
            
            <UFormField label="Head Coach" name="coach" required>
              <UInput 
                v-model="state.coach" 
                placeholder="e.g., Mike Johnson"
                icon="i-lucide-user"
              />
            </UFormField>
          </div>

          <!-- Home Field & Year Established -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Home Field" name="homeField" required>
              <UInput 
                v-model="state.homeField" 
                placeholder="e.g., Legend Park"
                icon="i-lucide-map-pin"
              />
            </UFormField>
            
            <UFormField label="Year Established" name="established" required>
              <UInput 
                v-model="state.established" 
                type="number"
                :min="1900"
                :max="new Date().getFullYear()"
                placeholder="2024"
              />
            </UFormField>
          </div>

          <!-- Team Colors -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Team Colors</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField label="Primary Color" name="primaryColor" required>
                <div class="flex space-x-2">
                  <UInput 
                    v-model="state.primaryColor" 
                    type="color"
                    class="w-16"
                  />
                  <UInput 
                    v-model="state.primaryColor" 
                    placeholder="#3BFF42"
                    class="flex-1"
                  />
                </div>
              </UFormField>
              
              <UFormField label="Secondary Color" name="secondaryColor" required>
                <div class="flex space-x-2">
                  <UInput 
                    v-model="state.secondaryColor" 
                    type="color"
                    class="w-16"
                  />
                  <UInput 
                    v-model="state.secondaryColor" 
                    placeholder="#071000"
                    class="flex-1"
                  />
                </div>
              </UFormField>
            </div>
          </div>

          <!-- Preview -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Preview</h3>
            <div class="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <div class="flex items-center space-x-3">
                <div 
                  class="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  :style="{ backgroundColor: state.primaryColor || '#3BFF42' }"
                >
                  {{ state.abbreviation || 'ABC' }}
                </div>
                <div>
                  <h4 class="text-xl font-semibold">{{ state.name || 'Team Name' }}</h4>
                  <p class="text-sm text-muted">{{ state.division || 'Division' }} Division</p>
                  <p class="text-sm text-muted">Coach: {{ state.coach || 'Head Coach' }}</p>
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
              Update Team
            </UButton>
          </div>
        </UForm>
      </UCard>
    </template>
  </UDashboardPanel>
</template>
