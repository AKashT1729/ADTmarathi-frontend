import React, { useState, useEffect, useMemo } from 'react';

const MarketPrice = () => {
  // Environment variables
  const apiKey = import.meta.env.VITE_API_KEY;
  const resourceId = import.meta.env.VITE_RESOURCE_ID;

  // State management
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [filterApplied, setFilterApplied] = useState(false);

  // Extract unique values from data
  const uniqueStates = useMemo(() => {
    return [...new Set(prices.map(item => item.state))].filter(Boolean).sort();
  }, [prices]);

  const uniqueMarkets = useMemo(() => {
    return [...new Set(
      prices
        .filter(item => !selectedState || item.state === selectedState)
        .map(item => item.market)
    )].filter(Boolean).sort();
  }, [prices, selectedState]);

  const uniqueCommodities = useMemo(() => {
    return [...new Set(
      prices
        .filter(item => 
          (!selectedState || item.state === selectedState) &&
          (!selectedMarket || item.market === selectedMarket)
        )
        .map(item => item.commodity)
    )].filter(Boolean).sort();
  }, [prices, selectedState, selectedMarket]);

  // Filtered prices
  const filteredPrices = useMemo(() => {
    return prices.filter(item => {
      const matchState = !selectedState || item.state === selectedState;
      const matchMarket = !selectedMarket || item.market === selectedMarket;
      const matchCommodity = !selectedCommodity || item.commodity === selectedCommodity;
      return matchState && matchMarket && matchCommodity;
    });
  }, [prices, selectedState, selectedMarket, selectedCommodity]);

  // Fetch data from API
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('MarketRates useEffect start');

        // Build URL with optional state filter (server-side filtering)
        const baseUrl = `https://api.data.gov.in/resource/${resourceId}`;
        const params = new URLSearchParams({
          'api-key': apiKey,
          format: 'json',
          limit: '500',
          offset: '0'
        });
        if (selectedState) {
          params.append('filters[state]', selectedState);
        }
        const url = `${baseUrl}?${params.toString()}`;
        console.log('Fetch URL:', url);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        // console.log(data.records);

     
        if (data.records && Array.isArray(data.records)) {
          setPrices(data.records);
          // Auto-select first state from the data
          const firstState = [...new Set(data.records.map(item => item.state))].filter(Boolean)[0];
         
          if (firstState) {
            setSelectedState(firstState);
          }
        } else {
          throw new Error('Invalid data format from API');
        }
      } catch (err) {
        console.error('Error fetching market data:', err);
        setError('Failed to load market data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, [apiKey, resourceId, selectedState]);

  // Handle state change
  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setSelectedMarket(''); // Reset market when state changes
    setSelectedCommodity(''); // Reset commodity when state changes
    setFilterApplied(true);
  };

  // Handle market change
  const handleMarketChange = (e) => {
    const newMarket = e.target.value;
    setSelectedMarket(newMarket);
    setSelectedCommodity(''); // Reset commodity when market changes
    setFilterApplied(true);
  };

  // Handle commodity change
  const handleCommodityChange = (e) => {
    const newCommodity = e.target.value;
    setSelectedCommodity(newCommodity);
    setFilterApplied(true);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedState('');
    setSelectedMarket('');
    setSelectedCommodity('');
    setFilterApplied(false);
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <p className="mt-4 text-gray-600">Loading market rates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Live Mandi Rates</h2>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Filters</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* State Filter */}
          <div className="flex flex-col">
            <label htmlFor="state" className="text-sm font-medium text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              id="state"
              value={selectedState}
              onChange={handleStateChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">-- Select State --</option>
              {uniqueStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* Market Filter */}
          <div className="flex flex-col">
            <label htmlFor="market" className="text-sm font-medium text-gray-700 mb-2">
              Market {selectedState && <span className="text-blue-600">(optional)</span>}
            </label>
            <select
              id="market"
              value={selectedMarket}
              onChange={handleMarketChange}
              disabled={!selectedState || uniqueMarkets.length === 0}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">-- All Markets --</option>
              {uniqueMarkets.map(market => (
                <option key={market} value={market}>{market}</option>
              ))}
            </select>
          </div>

          {/* Commodity Filter */}
          <div className="flex flex-col">
            <label htmlFor="commodity" className="text-sm font-medium text-gray-700 mb-2">
              Commodity {selectedMarket && <span className="text-blue-600">(optional)</span>}
            </label>
            <select
              id="commodity"
              value={selectedCommodity}
              onChange={handleCommodityChange}
              disabled={!selectedState || uniqueCommodities.length === 0}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">-- All Commodities --</option>
              {uniqueCommodities.map(commodity => (
                <option key={commodity} value={commodity}>{commodity}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Reset Button */}
        {filterApplied && (
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm font-medium transition"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing <span className="font-bold text-green-600">{filteredPrices.length}</span> results
          {filterApplied && <span> (filtered)</span>}
        </p>
      </div>

      {/* Results */}
      {filteredPrices.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800">No market data available for the selected filters.</p>
          <button
            onClick={resetFilters}
            className="mt-3 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md text-sm font-medium transition"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrices.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition bg-white"
            >
              <div className="mb-3">
                <p className="text-sm text-gray-500">Market</p>
                <p className="text-lg font-semibold text-gray-800">{item.market}</p>
              </div>

              <div className="mb-3">
                <p className="text-sm text-gray-500">State</p>
                <p className="text-sm text-gray-700">{item.state}</p>
              </div>

              <div className="mb-3">
                <p className="text-sm text-gray-500">Commodity</p>
                <p className="font-medium text-gray-800">{item.commodity}</p>
              </div>

              <div className="border-t pt-3 mt-3">
                <p className="text-sm text-gray-500">Modal Price</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{item.modal_price || 'N/A'}
                </p>
                <p className="text-xs text-gray-600">per Quintal</p>
              </div>

              {item.arrival_date && (
                <div className="mt-3 text-xs text-gray-500">
                  <p>Date: {new Date(item.arrival_date).toLocaleDateString('en-IN')}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketPrice;