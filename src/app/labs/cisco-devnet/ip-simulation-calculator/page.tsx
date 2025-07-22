"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../../../../components/Navbar";
import Footer from "../../../../../components/Footer";

interface SubnetInfo {
  networkClass: string;
  firstOctetRange: string;
  ipAddress: string;
  hexIpAddress: string;
  subnetMask: string;
  wildcardMask: string;
  subnetBits: number;
  maskBits: number;
  maxSubnets: number;
  hostsPerSubnet: number;
  hostAddressRange: string;
  subnetId: string;
  broadcastAddress: string;
}

export default function IPSimulationCalculatorPage() {
  const [ipAddress, setIpAddress] = useState("192.168.0.1");
  const [subnetMask, setSubnetMask] = useState("255.255.255.0");
  const [subnetInfo, setSubnetInfo] = useState<SubnetInfo>({
    networkClass: "C",
    firstOctetRange: "192 - 223",
    ipAddress: "192.168.0.1",
    hexIpAddress: "C0.A8.00.01",
    subnetMask: "255.255.255.0",
    wildcardMask: "0.0.0.255",
    subnetBits: 0,
    maskBits: 24,
    maxSubnets: 1,
    hostsPerSubnet: 254,
    hostAddressRange: "192.168.0.1 - 192.168.0.254",
    subnetId: "192.168.0.0",
    broadcastAddress: "192.168.0.255"
  });

  // Convert IP address to hex
  const ipToHex = (ip: string): string => {
    return ip.split('.').map(octet => {
      const hex = parseInt(octet).toString(16).toUpperCase();
      return hex.padStart(2, '0');
    }).join('.');
  };

  // Convert subnet mask to wildcard mask
  const maskToWildcard = (mask: string): string => {
    return mask.split('.').map(octet => {
      return (255 - parseInt(octet)).toString();
    }).join('.');
  };

  // Calculate network class and first octet range
  const getNetworkClass = (ip: string): { class: string; range: string } => {
    const firstOctet = parseInt(ip.split('.')[0]);
    if (firstOctet >= 1 && firstOctet <= 126) {
      return { class: "A", range: "1 - 126" };
    } else if (firstOctet >= 128 && firstOctet <= 191) {
      return { class: "B", range: "128 - 191" };
    } else if (firstOctet >= 192 && firstOctet <= 223) {
      return { class: "C", range: "192 - 223" };
    } else if (firstOctet >= 224 && firstOctet <= 239) {
      return { class: "D", range: "224 - 239" };
    } else {
      return { class: "E", range: "240 - 255" };
    }
  };

  // Calculate subnet bits and mask bits
  const calculateBits = (mask: string): { subnetBits: number; maskBits: number } => {
    const maskParts = mask.split('.').map(octet => parseInt(octet));
    let maskBits = 0;
    
    for (let i = 0; i < 4; i++) {
      let octet = maskParts[i];
      while (octet > 0) {
        if (octet & 1) maskBits++;
        octet >>= 1;
      }
    }
    
    return { subnetBits: 32 - maskBits, maskBits };
  };

  // Calculate maximum subnets
  const calculateMaxSubnets = (subnetBits: number): number => {
    return Math.pow(2, subnetBits);
  };

  // Calculate hosts per subnet
  const calculateHostsPerSubnet = (maskBits: number): number => {
    return Math.pow(2, 32 - maskBits) - 2;
  };

  // Calculate subnet ID
  const calculateSubnetId = (ip: string, mask: string): string => {
    const ipParts = ip.split('.').map(octet => parseInt(octet));
    const maskParts = mask.split('.').map(octet => parseInt(octet));
    
    const subnetId = ipParts.map((octet, i) => octet & maskParts[i]);
    return subnetId.join('.');
  };

  // Calculate broadcast address
  const calculateBroadcastAddress = (subnetId: string, mask: string): string => {
    const subnetParts = subnetId.split('.').map(octet => parseInt(octet));
    const maskParts = mask.split('.').map(octet => parseInt(octet));
    
    const broadcast = subnetParts.map((octet, i) => {
      return octet | (255 - maskParts[i]);
    });
    return broadcast.join('.');
  };

  // Calculate host address range
  const calculateHostRange = (subnetId: string, broadcast: string): string => {
    const subnetParts = subnetId.split('.').map(octet => parseInt(octet));
    const broadcastParts = broadcast.split('.').map(octet => parseInt(octet));
    
    // First host address
    const firstHost = [...subnetParts];
    firstHost[3] += 1;
    
    // Last host address
    const lastHost = [...broadcastParts];
    lastHost[3] -= 1;
    
    return `${firstHost.join('.')} - ${lastHost.join('.')}`;
  };

  // Update calculations when IP or mask changes
  useEffect(() => {
    if (ipAddress && subnetMask) {
      const networkClass = getNetworkClass(ipAddress);
      const { subnetBits, maskBits } = calculateBits(subnetMask);
      const maxSubnets = calculateMaxSubnets(subnetBits);
      const hostsPerSubnet = calculateHostsPerSubnet(maskBits);
      const subnetId = calculateSubnetId(ipAddress, subnetMask);
      const broadcastAddress = calculateBroadcastAddress(subnetId, subnetMask);
      const hostRange = calculateHostRange(subnetId, broadcastAddress);

      setSubnetInfo({
        networkClass: networkClass.class,
        firstOctetRange: networkClass.range,
        ipAddress,
        hexIpAddress: ipToHex(ipAddress),
        subnetMask,
        wildcardMask: maskToWildcard(subnetMask),
        subnetBits,
        maskBits,
        maxSubnets,
        hostsPerSubnet,
        hostAddressRange: hostRange,
        subnetId,
        broadcastAddress
      });
    }
  }, [ipAddress, subnetMask]);

  return (
    <>
      <Navbar isLoggedIn={false} />

      <section className="min-h-screen bg-dark-900 text-gray-200 px-4 py-10">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-16 mt-12">
          <h1 className="text-4xl font-bold text-white mb-4">IP Subnet Calculator</h1>
          <p className="text-gray-400 text-lg">
            Calculate subnet information, network addresses, and host ranges with our comprehensive IP calculator.
          </p>
        </div>

        {/* Calculator Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-dark-800 rounded-xl border border-gray-700 shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Input Parameters</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  IP Address
                </label>
                <input
                  type="text"
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="192.168.0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subnet Mask
                </label>
                <input
                  type="text"
                  value={subnetMask}
                  onChange={(e) => setSubnetMask(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="255.255.255.0"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Network Information */}
            <div className="bg-dark-800 rounded-xl border border-gray-700 shadow-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Network Information</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Network Class:</span>
                  <span className="text-white font-mono">{subnetInfo.networkClass}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">First Octet Range:</span>
                  <span className="text-white font-mono">{subnetInfo.firstOctetRange}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">IP Address:</span>
                  <span className="text-white font-mono">{subnetInfo.ipAddress}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Hex IP Address:</span>
                  <span className="text-white font-mono">{subnetInfo.hexIpAddress}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Subnet Mask:</span>
                  <span className="text-white font-mono">{subnetInfo.subnetMask}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Wildcard Mask:</span>
                  <span className="text-white font-mono">{subnetInfo.wildcardMask}</span>
                </div>
              </div>
            </div>

            {/* Subnet Details */}
            <div className="bg-dark-800 rounded-xl border border-gray-700 shadow-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Subnet Details</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Subnet Bits:</span>
                  <span className="text-white font-mono">{subnetInfo.subnetBits}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Mask Bits:</span>
                  <span className="text-white font-mono">{subnetInfo.maskBits}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Maximum Subnets:</span>
                  <span className="text-white font-mono">{subnetInfo.maxSubnets}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Hosts per Subnet:</span>
                  <span className="text-white font-mono">{subnetInfo.hostsPerSubnet}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Host Address Range:</span>
                  <span className="text-white font-mono text-sm">{subnetInfo.hostAddressRange}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Subnet ID:</span>
                  <span className="text-white font-mono">{subnetInfo.subnetId}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Broadcast Address:</span>
                  <span className="text-white font-mono">{subnetInfo.broadcastAddress}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Reference */}
          <div className="mt-8 bg-dark-800 rounded-xl border border-gray-700 shadow-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Reference</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="text-indigo-400 font-semibold mb-2">Common Subnet Masks</h4>
                <div className="space-y-1 text-gray-300">
                  <div>/24 = 255.255.255.0</div>
                  <div>/16 = 255.255.0.0</div>
                  <div>/8 = 255.0.0.0</div>
                </div>
              </div>
              <div>
                <h4 className="text-indigo-400 font-semibold mb-2">Network Classes</h4>
                <div className="space-y-1 text-gray-300">
                  <div>Class A: 1-126</div>
                  <div>Class B: 128-191</div>
                  <div>Class C: 192-223</div>
                </div>
              </div>
              <div>
                <h4 className="text-indigo-400 font-semibold mb-2">Special Addresses</h4>
                <div className="space-y-1 text-gray-300">
                  <div>Subnet ID: First address</div>
                  <div>Broadcast: Last address</div>
                  <div>Hosts: In between</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}