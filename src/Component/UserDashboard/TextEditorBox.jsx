import React, { useState, useEffect, useRef, useCallback } from "react";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Highlight } from '@tiptap/extension-highlight'
import { TextAlign } from '@tiptap/extension-text-align'
import { Link } from '@tiptap/extension-link'
import { Image } from '@tiptap/extension-image'
import '../../styles/tiptap.css'

export default function TextEditorBox({ onContentChange, onEditorReady, initialContent = '<p>Start writing your post...</p>' }) {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showHighlightPicker, setShowHighlightPicker] = useState(false);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [linkText, setLinkText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const colorPickerRef = useRef(null);
    const highlightPickerRef = useRef(null);

    // Initialize Tiptap editor
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // Configure StarterKit to exclude conflicting extensions
                link: false, // We'll use our custom Link extension
            }),
            Underline,
            TextStyle,
            Color.configure({
                types: ['textStyle'],
            }),
            Highlight.configure({
                multicolor: true,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    className: 'text-blue-600 underline cursor-pointer',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    className: 'max-w-full h-auto rounded-lg',
                },
            }),
        ],
        content: initialContent,
        editorProps: {
            attributes: {
                className: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-96 p-4',
            },
        },
        onUpdate: ({ editor }) => {
            // Call parent callback when content changes
            if (onContentChange) {
                onContentChange(editor.getHTML());
            }
        },
    });

    // Close color pickers when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
                setShowColorPicker(false);
            }
            if (highlightPickerRef.current && !highlightPickerRef.current.contains(event.target)) {
                setShowHighlightPicker(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle link insertion
    const handleInsertLink = () => {
        if (linkUrl) {
            if (linkText) {
                // Insert new link with custom text
                editor?.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run();
            } else {
                // Apply link to selected text or insert with URL as text
                const selectedText = editor?.state.doc.textBetween(
                    editor.state.selection.from,
                    editor.state.selection.to
                );
                if (selectedText) {
                    editor?.chain().focus().setLink({ href: linkUrl }).run();
                } else {
                    editor?.chain().focus().insertContent(`<a href="${linkUrl}">${linkUrl}</a>`).run();
                }
            }
        }
        setShowLinkModal(false);
        setLinkUrl('');
        setLinkText('');
    };

    // Handle image insertion
    const handleInsertImage = () => {
        if (imageUrl) {
            try {
                new URL(imageUrl); // Validate URL
                editor?.chain().focus().setImage({ src: imageUrl }).run();
                setShowImageModal(false);
                setImageUrl('');
            } catch (e) {
                alert('Please enter a valid image URL');
            }
        }
    };

    // Get content function for parent component
    const getContent = useCallback(() => {
        return editor?.getHTML() || '';
    }, [editor]);

    // Expose getContent function to parent
    useEffect(() => {
        if (editor) {
            // Make getContent available on the editor instance
            editor.getContent = getContent;

            // Call onEditorReady callback
            if (onEditorReady) {
                onEditorReady(editor);
            }

            // Set initial content
            if (onContentChange) {
                onContentChange(editor.getHTML());
            }
        }
    }, [editor, onContentChange, onEditorReady, getContent]);

    return (
        <div className="w-full">
            {/* Tiptap Editor Toolbar */}
            <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
                <div className="flex flex-wrap gap-1 p-3 border-b border-gray-300 bg-gray-50">
                    {/* Heading Buttons */}
                    <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().setParagraph().run()}
                            className={`px-2 py-1 rounded text-sm font-medium transition ${editor?.isActive('paragraph')
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            P
                        </button>
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                            className={`px-2 py-1 rounded text-sm font-medium transition ${editor?.isActive('heading', { level: 1 })
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            H1
                        </button>
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={`px-2 py-1 rounded text-sm font-medium transition ${editor?.isActive('heading', { level: 2 })
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            H2
                        </button>
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                            className={`px-2 py-1 rounded text-sm font-medium transition ${editor?.isActive('heading', { level: 3 })
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            H3
                        </button>
                    </div>

                    {/* Text Formatting */}
                    <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleBold().run()}
                            className={`px-2 py-1 rounded text-sm font-bold transition ${editor?.isActive('bold')
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            B
                        </button>
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleItalic().run()}
                            className={`px-2 py-1 rounded text-sm italic transition ${editor?.isActive('italic')
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            I
                        </button>
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleUnderline().run()}
                            className={`px-2 py-1 rounded text-sm underline transition ${editor?.isActive('underline')
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            U
                        </button>
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleStrike().run()}
                            className={`px-2 py-1 rounded text-sm line-through transition ${editor?.isActive('strike')
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            S
                        </button>
                    </div>

                    {/* Lists */}
                    <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleBulletList().run()}
                            className={`px-2 py-1 rounded text-sm transition ${editor?.isActive('bulletList')
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            •List
                        </button>
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                            className={`px-2 py-1 rounded text-sm transition ${editor?.isActive('orderedList')
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            1.List
                        </button>
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                            className={`px-2 py-1 rounded text-sm transition ${editor?.isActive('blockquote')
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Quote
                        </button>
                    </div>

                    {/* Alignment */}
                    <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                            className={`px-2 py-1 rounded text-sm transition ${editor?.isActive({ textAlign: 'left' })
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            ⬅
                        </button>
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                            className={`px-2 py-1 rounded text-sm transition ${editor?.isActive({ textAlign: 'center' })
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            ↔
                        </button>
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                            className={`px-2 py-1 rounded text-sm transition ${editor?.isActive({ textAlign: 'right' })
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            ➡
                        </button>
                    </div>

                    {/* Colors */}
                    <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2 relative" ref={colorPickerRef}>
                        <button
                            type="button"
                            onClick={() => setShowColorPicker(!showColorPicker)}
                            className="px-2 py-1 rounded text-sm bg-white text-gray-700 hover:bg-gray-100 transition border"
                        >
                            A🎨
                        </button>
                        {showColorPicker && (
                            <div className="absolute top-8 left-0 z-10 bg-white border border-gray-300 rounded-lg p-2 shadow-lg">
                                <div className="grid grid-cols-6 gap-1">
                                    {['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080'].map(color => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => {
                                                editor?.chain().focus().setColor(color).run();
                                                setShowColorPicker(false);
                                            }}
                                            className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                                            style={{ backgroundColor: color }}
                                            title={`Set text color to ${color}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="relative" ref={highlightPickerRef}>
                            <button
                                type="button"
                                onClick={() => setShowHighlightPicker(!showHighlightPicker)}
                                className="px-2 py-1 rounded text-sm bg-white text-gray-700 hover:bg-gray-100 transition border"
                            >
                                🖍
                            </button>
                            {showHighlightPicker && (
                                <div className="absolute top-8 left-0 z-10 bg-white border border-gray-300 rounded-lg p-2 shadow-lg">
                                    <div className="grid grid-cols-3 gap-1">
                                        {['#FFFF00', '#00FF00', '#FF0000', '#0000FF', '#FFA500', '#FF00FF'].map(color => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => {
                                                    editor?.chain().focus().toggleHighlight({ color }).run();
                                                    setShowHighlightPicker(false);
                                                }}
                                                className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                                                style={{ backgroundColor: color }}
                                                title={`Highlight with ${color}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Links and Media */}
                    <div className="flex gap-1">
                        <button
                            type="button"
                            onClick={() => setShowLinkModal(true)}
                            className={`px-2 py-1 rounded text-sm transition ${editor?.isActive('link')
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            🔗
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowImageModal(true)}
                            className="px-2 py-1 rounded text-sm bg-white text-gray-700 hover:bg-gray-100 transition"
                        >
                            🖼
                        </button>
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                            className={`px-2 py-1 rounded text-sm transition ${editor?.isActive('codeBlock')
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            &lt;/&gt;
                        </button>
                    </div>
                </div>

                <EditorContent
                    editor={editor}
                    className="min-h-96 max-h-96 overflow-y-auto"
                />
                {!editor && (
                    <div className="min-h-96 flex items-center justify-center text-gray-500">
                        Loading editor...
                    </div>
                )}
            </div>

            {/* Link Modal */}
            {showLinkModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
                        <h3 className="text-lg font-semibold mb-4">Insert Link</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    URL *
                                </label>
                                <input
                                    type="url"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    placeholder="https://example.com"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Link Text (optional)
                                </label>
                                <input
                                    type="text"
                                    value={linkText}
                                    onChange={(e) => setLinkText(e.target.value)}
                                    placeholder="Click here"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Leave empty to apply link to selected text
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowLinkModal(false);
                                    setLinkUrl('');
                                    setLinkText('');
                                }}
                                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleInsertLink}
                                disabled={!linkUrl}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                            >
                                Insert Link
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Modal */}
            {showImageModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
                        <h3 className="text-lg font-semibold mb-4">Insert Image</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Image URL *
                                </label>
                                <input
                                    type="url"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    autoFocus
                                />
                            </div>

                            {imageUrl && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Preview
                                    </label>
                                    <div className="border border-gray-300 rounded-md p-2">
                                        <img
                                            src={imageUrl}
                                            alt="Preview"
                                            className="max-w-full h-auto max-h-40 mx-auto"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowImageModal(false);
                                    setImageUrl('');
                                }}
                                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleInsertImage}
                                disabled={!imageUrl}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                            >
                                Insert Image
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
