import { useState } from 'react'
import { Tab } from '@headlessui/react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0)
  
  const categories = [
    { name: 'General', component: <GeneralSettings /> },
    { name: 'Account', component: <AccountSettings /> },
    { name: 'Data', component: <DataSettings /> },
    { name: 'Integrations', component: <IntegrationsSettings /> },
    { name: 'AI Configuration', component: <AISettings /> },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-gray-500">
          Manage your preferences and application settings.
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <Tab.Group onChange={setActiveTab} selectedIndex={activeTab}>
          <Tab.List className="flex border-b border-gray-200">
            {categories.map((category, index) => (
              <Tab
                key={category.name}
                className={({ selected }) =>
                  classNames(
                    'py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap',
                    'focus:outline-none',
                    selected
                      ? 'text-primary-600 border-b-2 border-primary-500'
                      : 'hover:text-gray-700 hover:border-gray-300'
                  )
                }
              >
                {category.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="px-4 py-5 sm:p-6">
            {categories.map((category, idx) => (
              <Tab.Panel key={idx}>
                {category.component}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

// Placeholder components for different settings sections
const GeneralSettings = () => (
  <div>
    <div className="text-center py-8">
      <h3 className="text-lg font-medium text-gray-900">General Settings</h3>
      <p className="mt-2 text-sm text-gray-500">
        This is a placeholder for general settings. <br />
        Full implementation coming in the next development phase.
      </p>
    </div>
  </div>
)

const AccountSettings = () => (
  <div>
    <div className="text-center py-8">
      <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
      <p className="mt-2 text-sm text-gray-500">
        This is a placeholder for account settings. <br />
        Full implementation coming in the next development phase.
      </p>
    </div>
  </div>
)

const DataSettings = () => (
  <div>
    <div className="text-center py-8">
      <h3 className="text-lg font-medium text-gray-900">Data Settings</h3>
      <p className="mt-2 text-sm text-gray-500">
        This is a placeholder for data settings. <br />
        Full implementation coming in the next development phase.
      </p>
    </div>
  </div>
)

const IntegrationsSettings = () => (
  <div>
    <div className="text-center py-8">
      <h3 className="text-lg font-medium text-gray-900">Integrations Settings</h3>
      <p className="mt-2 text-sm text-gray-500">
        This is a placeholder for integrations settings. <br />
        Full implementation coming in the next development phase.
      </p>
    </div>
  </div>
)

const AISettings = () => (
  <div>
    <div className="text-center py-8">
      <h3 className="text-lg font-medium text-gray-900">AI Configuration</h3>
      <p className="mt-2 text-sm text-gray-500">
        This is a placeholder for AI configuration settings. <br />
        Full implementation coming in the next development phase.
      </p>
    </div>
  </div>
)

export default Settings
