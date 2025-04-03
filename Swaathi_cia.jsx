import React, { useState } from 'react';
import { Bell, MessageSquare, BarChart2, Calendar, Search, Star, Send, User, Users, Clock, FileText } from 'lucide-react';

// Mock data for dashboards
const pendingTasks = [
  { priority: 'High', count: 12 },
  { priority: 'Medium', count: 24 },
  { priority: 'Low', count: 8 }
];

const performanceData = [
  { month: 'Jan', score: 76 },
  { month: 'Feb', score: 82 },
  { month: 'Mar', score: 78 },
  { month: 'Apr', score: 84 },
  { month: 'May', score: 90 }
];

// Mock data for workload distribution heatmap
const workloadData = [
  { team: 'Engineering', mon: 8, tue: 9, wed: 10, thu: 7, fri: 6 },
  { team: 'Design', mon: 6, tue: 8, wed: 5, thu: 9, fri: 7 },
  { team: 'Marketing', mon: 5, tue: 4, wed: 7, thu: 8, fri: 9 },
  { team: 'Product', mon: 9, tue: 7, wed: 6, thu: 5, fri: 8 }
];

// Mock data for project success/failure
const projectData = [
  { name: 'Alpha', success: 85, failure: 15 },
  { name: 'Beta', success: 65, failure: 35 },
  { name: 'Gamma', success: 92, failure: 8 },
  { name: 'Delta', success: 78, failure: 22 }
];

// Mock chat data
const chatMessages = [
  { id: 1, sender: 'Alex Kim', message: 'Has everyone reviewed the product requirements?', time: '9:30 AM', isUser: false },
  { id: 2, sender: 'Swaathi', message: 'Yes, I\'ve gone through them. I have a few questions about the timeline.', time: '9:32 AM', isUser: true },
  { id: 3, sender: 'Raj Patel', message: 'I think we should schedule a meeting to discuss the implementation details.', time: '9:35 AM', isUser: false },
  { id: 4, sender: 'Alex Kim', message: '@Swaathi can you share your concerns about the timeline?', time: '9:40 AM', isUser: false, mention: true },
  { id: 5, sender: 'Swaathi', message: 'I\'m concerned about the deadline for Phase 2. It seems too tight given the complexity.', time: '9:43 AM', isUser: true }
];

const chatRooms = [
  { id: 1, name: 'Project Alpha', unread: 3 },
  { id: 2, name: 'Design Team', unread: 0 },
  { id: 3, name: 'Engineering', unread: 7 },
  { id: 4, name: 'Alex Kim', unread: 0, direct: true },
  { id: 5, name: 'Raj Patel', unread: 2, direct: true }
];

// Dashboard card component
const DashboardCard = ({ title, children, icon }) => (
  <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
    <div className="flex items-center mb-4">
      <div className="mr-2">{icon}</div>
      <h3 className="font-bold text-lg">{title}</h3>
    </div>
    {children}
  </div>
);

// Main component
const ProcessPlanningSoftware = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([...chatMessages]);
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: 'Swaathi',
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };
  
  // Dashboard section
  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DashboardCard title="Pending Work Tracker" icon={<Clock className="text-blue-500" />}>
        <div className="h-64">
          {/* Bar Chart for Pending Tasks */}
          <div className="flex h-48 items-end space-x-2">
            {pendingTasks.map((task, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className={`w-full rounded-t-md ${
                    task.priority === 'High' ? 'bg-red-500' :
                    task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} 
                  style={{ height: `${task.count * 3}px` }}
                ></div>
                <div className="text-xs mt-2 font-medium">{task.priority}</div>
                <div className="text-sm font-bold">{task.count}</div>
              </div>
            ))}
          </div>
        </div>
      </DashboardCard>
      
      <DashboardCard title="Performance Improvement" icon={<BarChart2 className="text-purple-500" />}>
        <div className="h-64">
          {/* Line Chart for Performance */}
          <div className="relative h-48">
            <div className="absolute inset-0">
              <div className="flex h-full items-end">
                {performanceData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1 relative">
                    {index > 0 && (
                      <div 
                        className="absolute h-px bg-purple-500" 
                        style={{
                          width: '100%',
                          top: `${100 - data.score}%`,
                          left: '-50%',
                          transform: `rotate(${Math.atan2(
                            (performanceData[index-1].score - data.score),
                            100
                          ) * (180/Math.PI)}deg)`,
                          transformOrigin: 'left center'
                        }}
                      ></div>
                    )}
                    <div className="absolute w-3 h-3 rounded-full bg-purple-500" style={{ bottom: `${data.score}%` }}></div>
                    <div className="absolute text-xs font-medium" style={{ bottom: '-20px' }}>{data.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>
      
      <DashboardCard title="Workload Distribution Analysis" icon={<FileText className="text-green-500" />}>
        <div className="h-64 overflow-x-auto">
          {/* Heatmap for Workload Distribution */}
          <div className="flex flex-col">
            <div className="flex mb-2">
              <div className="w-24 font-medium text-xs"></div>
              <div className="flex flex-1 justify-between">
                <div className="w-10 text-center text-xs font-medium">Mon</div>
                <div className="w-10 text-center text-xs font-medium">Tue</div>
                <div className="w-10 text-center text-xs font-medium">Wed</div>
                <div className="w-10 text-center text-xs font-medium">Thu</div>
                <div className="w-10 text-center text-xs font-medium">Fri</div>
              </div>
            </div>
            
            {workloadData.map((row, rowIndex) => (
              <div key={rowIndex} className="flex mb-1">
                <div className="w-24 text-xs font-medium">{row.team}</div>
                <div className="flex flex-1 justify-between">
                  {['mon', 'tue', 'wed', 'thu', 'fri'].map((day, dayIndex) => {
                    // Calculate color intensity based on workload
                    const intensity = Math.min(255, Math.floor(255 - (row[day] * 20)));
                    return (
                      <div 
                        key={dayIndex} 
                        className="w-10 h-10 flex items-center justify-center text-xs font-medium rounded-sm"
                        style={{ 
                          backgroundColor: `rgb(0, ${intensity}, 0)`,
                          color: row[day] > 7 ? 'white' : 'black'
                        }}
                      >
                        {row[day]}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            
            <div className="flex mt-2 justify-center">
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 bg-green-800 mr-1"></div>
                <span>High</span>
              </div>
              <div className="mx-2">→</div>
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 bg-green-200 mr-1"></div>
                <span>Low</span>
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>
      
      <DashboardCard title="Project Success and Failure Analytics" icon={<Bell className="text-orange-500" />}>
        <div className="h-64">
          {/* Comparative Bar Charts for Project Success/Failure */}
          <div className="flex flex-col h-48 justify-center">
            {projectData.map((project, index) => (
              <div key={index} className="mb-2">
                <div className="text-xs font-medium mb-1">{project.name}</div>
                <div className="flex h-6 w-full">
                  <div 
                    className="bg-blue-500 text-white text-xs flex items-center justify-end pr-1"
                    style={{ width: `${project.success}%` }}
                  >
                    {project.success}%
                  </div>
                  <div 
                    className="bg-red-500 text-white text-xs flex items-center justify-start pl-1"
                    style={{ width: `${project.failure}%` }}
                  >
                    {project.failure}%
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-2">
              <div className="flex items-center text-xs mr-4">
                <div className="w-3 h-3 bg-blue-500 mr-1"></div>
                <span>Success Rate</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 bg-red-500 mr-1"></div>
                <span>Failure Rate</span>
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
  
  // Chat section
  const renderChat = () => (
    <div className="grid grid-cols-12 gap-4 h-full">
      {/* Chat rooms list */}
      <div className="col-span-12 md:col-span-3 bg-gray-100 rounded-lg p-4">
        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full pl-8 pr-2 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
          </div>
        </div>
        
        <div className="space-y-1">
          {chatRooms.map(room => (
            <div 
              key={room.id}
              onClick={() => setSelectedChat(room.id)}
              className={`flex items-center p-2 rounded-md cursor-pointer ${selectedChat === room.id ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
            >
              <div className="mr-3">
                {room.direct ? (
                  <User className="w-5 h-5 text-blue-500" />
                ) : (
                  <Users className="w-5 h-5 text-purple-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium">{room.name}</div>
              </div>
              {room.unread > 0 && (
                <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {room.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="col-span-12 md:col-span-9 bg-white rounded-lg p-4 flex flex-col h-96">
        <div className="border-b pb-2 mb-2 flex justify-between items-center">
          <div className="font-bold text-lg">
            {chatRooms.find(room => room.id === selectedChat)?.name}
          </div>
          <div className="flex space-x-2">
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <Search className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <Calendar className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <Star className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map(msg => (
            <div 
              key={msg.id}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-3/4 rounded-lg p-3 ${
                msg.isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'
              } ${msg.mention ? 'border-l-4 border-yellow-500' : ''}`}>
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium text-sm">
                    {msg.sender}
                  </div>
                  <div className="text-xs opacity-75">
                    {msg.time}
                  </div>
                </div>
                <div>
                  {msg.message}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-auto">
          <div className="relative">
            <input 
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button 
              className="absolute right-2 top-2 p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
              onClick={handleSendMessage}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-xl p-2 rounded-lg">
              ProcessPro
            </div>
            <div className="text-lg font-medium">Welcome, Swaathi!</div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                8
              </span>
            </button>
            <div className="h-8 w-8 bg-purple-500 rounded-full text-white flex items-center justify-center font-bold">
              S
            </div>
          </div>
        </header>
        
        {/* Navigation */}
        <nav className="bg-white rounded-lg shadow-sm p-2 mb-6">
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                activeTab === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              <BarChart2 className="w-5 h-5" />
              <span>Dashboards</span>
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                activeTab === 'chat' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chat</span>
            </button>
          </div>
        </nav>
        
        {/* Main content */}
        <main className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'dashboard' ? renderDashboard() : renderChat()}
        </main>
      </div>
    </div>
  );
};

export default ProcessPlanningSoftware;