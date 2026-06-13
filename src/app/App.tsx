import { useState } from 'react';
import { Button } from './components/ui/button';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { LandingPage } from './components/LandingPage';
import { TenantDashboard } from './components/TenantDashboard';
import { LandlordDashboard } from './components/LandlordDashboard';
import { AuthPage } from './components/AuthPage';
import { PropertySearch } from './components/PropertySearch';
import { PropertyPost } from './components/PropertyPost';
import { LegalRights } from './components/LegalRights';
import { ChatInterface } from './components/ChatInterface';
import { PropertyDetails } from './components/PropertyDetails';
import { ProfilePage } from './components/ProfilePage';
import { WrittenAgreements } from './components/WrittenAgreements';
import { Transactions } from './components/Transactions';
import { Ratings } from './components/Ratings';
import { BookedFlats } from './components/BookedFlats';
import { EditProfile } from './components/EditProfile';
import { Services } from './components/Services';
import { MoveIn } from './components/MoveIn';
import { PremiumPayment } from './components/PremiumPayment';
import { PaymentInterface } from './components/PaymentInterface';
import { MyPosts } from './components/MyPosts';

export type UserType = 'tenant' | 'landlord' | null;

export interface User {
  type: UserType;
  name: string;
  email: string;
  phone: string;
  profilePic?: string;
  tenantScore?: string;
  physicalVerified?: boolean;
}

function AppInner() {
  const { lang } = useLanguage();
  return (
    <div
      className="size-full overflow-auto"
      style={{
        background: '#141414',
        fontFamily: lang === 'bn' ? "'Hind Siliguri', sans-serif" : undefined,
      }}
    >
      <AppRoutes />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}

function AppRoutes() {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [previousPage, setPreviousPage] = useState<string>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [chatWith, setChatWith] = useState<any>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    if (userData.type === 'tenant') {
      setCurrentPage('tenant-dashboard');
    } else {
      setCurrentPage('landlord-dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
    setPreviousPage('landing');
  };

  const navigateTo = (page: string, data?: any) => {
    setPreviousPage(currentPage);
    setCurrentPage(page);
    if (page === 'property-details') {
      setSelectedProperty(data);
    }
    if (page === 'chat') {
      setChatWith(data);
    }
    if (page === 'payment') {
      setSelectedTransaction(data);
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const goBack = () => {
    // Special case: if going back from chat and came from property pages, go to property search
    if (currentPage === 'chat' && (previousPage === 'property-search' || previousPage === 'property-details')) {
      setCurrentPage('property-search');
      return;
    }

    // Determine safe navigation based on user type
    if (user) {
      const dashboardPage = user.type === 'tenant' ? 'tenant-dashboard' : 'landlord-dashboard';
      setCurrentPage(dashboardPage);
    } else {
      setCurrentPage('landing');
    }
  };

  return (
    <>
      {currentPage === 'landing' && (
        <LandingPage onNavigate={navigateTo} />
      )}
      {currentPage === 'auth' && (
        <AuthPage onLogin={handleLogin} onBack={() => navigateTo('landing')} />
      )}
      {currentPage === 'tenant-dashboard' && (
        user ? (
          <TenantDashboard user={user} onNavigate={navigateTo} onLogout={handleLogout} />
        ) : (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Please log in to continue</p>
              <Button onClick={() => navigateTo('auth')}>Login</Button>
            </div>
          </div>
        )
      )}
      {currentPage === 'landlord-dashboard' && (
        user ? (
          <LandlordDashboard user={user} onNavigate={navigateTo} onLogout={handleLogout} />
        ) : (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Please log in to continue</p>
              <Button onClick={() => navigateTo('auth')}>Login</Button>
            </div>
          </div>
        )
      )}
      {currentPage === 'property-search' && (
        <PropertySearch
          userType={user?.type}
          onNavigate={navigateTo}
          onBack={() => {
            if (user) {
              navigateTo(user.type === 'tenant' ? 'tenant-dashboard' : 'landlord-dashboard');
            } else {
              navigateTo('landing');
            }
          }}
        />
      )}
      {currentPage === 'property-post' && (
        <PropertyPost
          onNavigate={navigateTo}
          onBack={() => {
            if (user?.type === 'landlord') {
              navigateTo('landlord-dashboard');
            } else {
              navigateTo('landing');
            }
          }}
        />
      )}
      {currentPage === 'legal-rights' && (
        <LegalRights
          userType={user?.type}
          onBack={goBack}
        />
      )}
      {currentPage === 'chat' && (
        <ChatInterface
          chatWith={chatWith}
          user={user}
          onBack={goBack}
        />
      )}
      {currentPage === 'property-details' && (
        <PropertyDetails
          property={selectedProperty}
          userType={user?.type}
          onNavigate={navigateTo}
          onBack={() => navigateTo('property-search')}
        />
      )}
      {currentPage === 'profile' && user && (
        <ProfilePage
          user={user}
          onNavigate={navigateTo}
          onBack={goBack}
        />
      )}
      {currentPage === 'agreements' && (
        <WrittenAgreements
          userType={user?.type}
          onBack={goBack}
        />
      )}
      {currentPage === 'transactions' && (
        <Transactions
          userType={user?.type}
          onNavigate={navigateTo}
          onBack={goBack}
        />
      )}
      {currentPage === 'ratings' && (
        <Ratings
          userType={user?.type}
          onBack={goBack}
        />
      )}
      {currentPage === 'booked-flats' && (
        <BookedFlats
          onNavigate={navigateTo}
          onBack={goBack}
        />
      )}
      {currentPage === 'edit-profile' && user && (
        <EditProfile
          user={user}
          onSave={updateUser}
          onBack={goBack}
        />
      )}
      {currentPage === 'services' && (
        <Services
          onNavigate={navigateTo}
          onBack={goBack}
        />
      )}
      {currentPage === 'move-in' && (
        <MoveIn
          onNavigate={navigateTo}
          onBack={() => navigateTo('services')}
        />
      )}
      {currentPage === 'premium-payment' && (
        <PremiumPayment
          onBack={() => navigateTo('services')}
        />
      )}
      {currentPage === 'payment' && (
        <PaymentInterface
          transaction={selectedTransaction}
          onBack={goBack}
        />
      )}
      {currentPage === 'my-posts' && (
        <MyPosts
          onBack={goBack}
        />
      )}
    </>
  );
}