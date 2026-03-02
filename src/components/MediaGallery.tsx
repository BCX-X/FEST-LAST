import { useState } from 'react';
import { Search, Filter, X, Play, Image as ImageIcon } from 'lucide-react';

interface MediaGalleryProps {
  fullPage?: boolean;
}

export function MediaGallery({ fullPage = false }: MediaGalleryProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'photo' | 'video'>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const mediaItems = [
    {
      id: 1,
      type: 'photo',
      title: 'Engineering Innovation Week 2026',
      department: 'All Departments',
      date: '2026-02-15',
      thumbnail: 'https://images.unsplash.com/photo-1596496356933-9b6e0b186b88?w=800',
      event: 'Innovation Week',
    },
    {
      id: 2,
      type: 'photo',
      title: 'Biotechnology Lab Research',
      department: 'Biotechnology & Agricultural Science',
      date: '2025-11-20',
      thumbnail: 'https://images.unsplash.com/photo-1618053238059-cc7761222f2a?w=800',
      event: 'Research Day',
    },
    {
      id: 3,
      type: 'photo',
      title: 'Graduation Ceremony 2025',
      department: 'All Departments',
      date: '2025-10-30',
      thumbnail: 'https://images.unsplash.com/photo-1738949538943-e54722a44ffc?w=800',
      event: 'Graduation',
    },
    {
      id: 4,
      type: 'video',
      title: 'Student Research Presentation',
      department: 'Computing & Software Engineering',
      date: '2026-01-05',
      thumbnail: 'https://images.unsplash.com/photo-1760420940953-3958ad9f6287?w=800',
      event: 'Research Symposium',
    },
    {
      id: 5,
      type: 'photo',
      title: 'Robotics Competition',
      department: 'Mechanical & Automotive Engineering',
      date: '2025-11-15',
      thumbnail: 'https://images.unsplash.com/photo-1562758778-e5638b5b6607?w=800',
      event: 'Robotics Championship',
    },
    {
      id: 6,
      type: 'photo',
      title: 'Programming Workshop',
      department: 'Computing & Software Engineering',
      date: '2026-02-10',
      thumbnail: 'https://images.unsplash.com/photo-1563630482997-07d8d7fbc9df?w=800',
      event: 'Coding Bootcamp',
    },
    {
      id: 7,
      type: 'photo',
      title: 'Civil Engineering Site Visit',
      department: 'Civil Engineering & Construction',
      date: '2025-11-25',
      thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
      event: 'Field Trip',
    },
    {
      id: 8,
      type: 'video',
      title: 'Electronics Lab Tour',
      department: 'Electrical & Electronics Engineering',
      date: '2026-01-20',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
      event: 'Lab Showcase',
    },
    {
      id: 9,
      type: 'photo',
      title: 'Student Laboratory Work',
      department: 'Biotechnology & Agricultural Science',
      date: '2025-11-10',
      thumbnail: 'https://images.unsplash.com/photo-1605781645799-c9c7d820b4ac?w=800',
      event: 'Lab Session',
    },
    {
      id: 10,
      type: 'photo',
      title: 'FEST Awards Ceremony 2024',
      department: 'All Departments',
      date: '2024-12-15',
      thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      event: 'Awards Night',
    },
    {
      id: 11,
      type: 'video',
      title: 'Campus Tour 2024',
      department: 'All Departments',
      date: '2024-09-10',
      thumbnail: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800',
      event: 'Open Day',
    },
  ];

  const departments = [
    'All Departments',
    'Civil Engineering & Construction',
    'Electrical & Electronics Engineering',
    'Mechanical & Automotive Engineering',
    'Computing & Software Engineering',
    'Biotechnology & Agricultural Science',
  ];

  // Extract unique years from media items
  const years = ['all', ...Array.from(new Set(mediaItems.map(item => new Date(item.date).getFullYear().toString()))).sort().reverse()];

  const filteredMedia = mediaItems.filter(item => {
    const matchesDepartment = selectedFilter === 'all' || item.department === selectedFilter;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesYear = selectedYear === 'all' || new Date(item.date).getFullYear().toString() === selectedYear;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.event.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesDepartment && matchesType && matchesYear && matchesSearch;
  });

  const openLightbox = (media: any) => {
    setSelectedMedia(media);
    setLightboxOpen(true);
  };

  return (
    <div className={fullPage ? 'max-w-7xl mx-auto px-4 py-16' : 'max-w-7xl mx-auto px-4 py-8'}>
      {!fullPage && (
        <h2 className="mb-8 text-center">Media Gallery</h2>
      )}
      
      {fullPage && (
        <>
          <h1 className="mb-4">Media Gallery</h1>
          <p className="text-gray-600 mb-8">
            Browse photos and videos from FEST events and activities (View only - downloads disabled)
          </p>
        </>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search events, titles, or departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
          />
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3>Media Type</h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedType === 'all'
                ? 'bg-[#1e3a8a] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Media
          </button>
          <button
            onClick={() => setSelectedType('photo')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              selectedType === 'photo'
                ? 'bg-[#1e3a8a] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Photos Only
          </button>
          <button
            onClick={() => setSelectedType('video')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              selectedType === 'video'
                ? 'bg-[#1e3a8a] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Play className="w-4 h-4" />
            Videos Only
          </button>
        </div>

        {/* Department Filter */}
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3>Department</h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedFilter === 'all'
                ? 'bg-[#1e3a8a] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Departments
          </button>
          {departments.slice(1).map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedFilter(dept)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedFilter === dept
                  ? 'bg-[#1e3a8a] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Year Filter */}
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3>Year</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedYear('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedYear === 'all'
                ? 'bg-[#1e3a8a] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Years
          </button>
          {years.filter(year => year !== 'all').map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedYear === year
                  ? 'bg-[#1e3a8a] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-600">
        Showing {filteredMedia.length} {filteredMedia.length === 1 ? 'result' : 'results'}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
            onClick={() => openLightbox(item)}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {item.type === 'video' && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4">
                    <Play className="w-8 h-8 text-[#1e3a8a]" />
                  </div>
                </div>
              )}
              <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs">
                {item.type === 'photo' ? 'Photo' : 'Video'}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="mb-2 line-clamp-2">{item.title}</h3>
              <div className="text-sm text-gray-600 mb-2">{item.event}</div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{new Date(item.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</span>
                <span className="text-[#1e3a8a]">View Only</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredMedia.length === 0 && (
        <div className="text-center py-16">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No media found matching your filters</p>
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && selectedMedia && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedMedia.thumbnail}
              alt={selectedMedia.title}
              className="w-full h-auto rounded-lg"
              onContextMenu={(e) => e.preventDefault()}
            />
            <div className="bg-white rounded-lg p-6 mt-4">
              <h2 className="mb-2">{selectedMedia.title}</h2>
              <p className="text-gray-600 mb-2">{selectedMedia.event}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{selectedMedia.department}</span>
                <span>{new Date(selectedMedia.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="mt-4 p-3 bg-gray-100 rounded-lg text-sm text-gray-600">
                ℹ️ This media is for viewing only. Downloads are disabled to protect content.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}