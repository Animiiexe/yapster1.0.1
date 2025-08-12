import { Card, CardBody, Avatar } from "@heroui/react";
import Image from "next/image";
import NewUser from "./NewUser";

export default function Chat({ content, own, type, name }) {
  const isAI = name === "AI";
  
  return (
    <div className={`flex ${own ? "justify-end" : "justify-start"} ${type === "user" ? "justify-center" : ""} mb-4`}>
      <div className={`flex ${own ? "flex-row-reverse" : "flex-row"} items-end gap-2 max-w-[85%]`}>
        {/* Avatar */}
        {!own && (
          <Avatar
            name={isAI ? "AI" : name?.slice(0, 1).toUpperCase()}
            className={`w-10 h-10 text-white shadow-md flex-shrink-0 ${
              isAI 
                ? "bg-gradient-to-br from-purple-500 to-blue-600" 
                : "bg-gradient-to-br from-gray-600 to-gray-800"
            }`}
          />        
        )}
        
        <Card
          className={`relative transition-all duration-200 hover:shadow-lg ${
            isAI
              ? "bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white shadow-xl border border-blue-400/30 backdrop-blur-sm"
              : own
              ? "bg-gradient-to-br from-gray-800 to-black text-white shadow-lg border border-gray-700/50"
              : "bg-white text-gray-800 shadow-md border border-gray-200"
          }`}
        >
          {/* Message tail/pointer */}
          <div 
            className={`absolute top-4 w-3 h-3 transform rotate-45 ${
              isAI
                ? "bg-blue-600"
                : own
                ? "bg-gray-800"
                : "bg-white border-l border-t border-gray-200"
            } ${
              own ? "right-[-6px]" : "left-[-6px]"
            }`}
          />
          
          <CardBody className="p-4 relative z-10">
            {/* Name (for non-AI messages) */}
            {!isAI && !own && (
              <span className="text-sm font-semibold mb-2 text-gray-600 block">
                {name?.charAt(0).toUpperCase() + name?.slice(1).toLowerCase()}
              </span>
            )}
            
            {/* AI Label */}
            {isAI && (
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xs font-semibold uppercase tracking-wider opacity-90">
                  AI Assistant
                </span>
              </div>
            )}
            
            {/* New User Notification */}
            {type === "user" && <NewUser name={content} />}
            
            {/* Text Message */}
            {type === "text" && (
              <div className={`${isAI ? "space-y-2" : ""}`}>
                <p className={`text-base leading-relaxed ${
                  isAI 
                    ? "font-medium" 
                    : own 
                    ? "font-normal" 
                    : "font-normal"
                }`}>
                  {content}
                </p>
                {isAI && (
                  <div className="flex items-center gap-1 mt-3 opacity-60">
                    <div className="w-1 h-1 rounded-full bg-white animate-pulse"></div>
                    <div className="w-1 h-1 rounded-full bg-white animate-pulse delay-75"></div>
                    <div className="w-1 h-1 rounded-full bg-white animate-pulse delay-150"></div>
                  </div>
                )}
              </div>
            )}
            
            {/* Link Message */}
            {type === "link" && (
              <div className="group">
                <a 
                  href={content} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isAI || own
                      ? "text-blue-200 hover:text-blue-100 hover:bg-white/10"
                      : "text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="truncate max-w-xs">{content}</span>
                </a>
              </div>
            )}
            
            {/* Image Message */}
            {type === "image" && (
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image 
                  alt="image message" 
                  src={content || "/placeholder.svg"} 
                  width={400} 
                  height={300} 
                  className="rounded-lg transition-transform duration-200 hover:scale-105"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </CardBody>
        </Card>
        
        {/* Own message avatar */}
        {own && (
          <Avatar
            name={name?.slice(0, 1).toUpperCase() || "U"}
            className="w-10 h-10 text-white bg-gradient-to-br from-green-500 to-blue-600 shadow-md flex-shrink-0"
          />        
        )}
      </div>
    </div>
  );
}