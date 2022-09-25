import React from "react";

const CurriculumTable = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col m-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-s font-medium">
                                    <p className="font-bold">
                                      Actions
                                    </p>
                                    <p className="text-gray-500">
                                      Move,indent,
                                      outdent,delete
                                    </p>
                                </th>
                                  <th scope="col" className="px-6 py-3 text-left text-s font-medium">
                                      <p className="font-bold">
                                          Standard
                                      </p>
                                      <p className="text-gray-500">
                                          The text of the standard
                                      </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {children}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CurriculumTable;
