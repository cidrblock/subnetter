zone = %{
  - name: "zone1"
    type: container
    children:
      - name: "{{site1}}-zone1-servers1.1"
        type: subnet
      - name: "{{site2}}-zone1-servers1.1"
        type: subnet
      - name: "{{site1}}-zone1-servers1.2"
        type: subnet
      - name: "{{site2}}-zone1-servers1.2"
        type: subnet
      - name: "{{site1}}-zone1-servers1.3"
        type: subnet
      - name: "{{site2}}-zone1-servers1.3"
        type: subnet
      - name: "{{site1}}-zone1-unused"
        type: subnet
      - name: "zone1-network"
        type: container
        children:
          - name: "{{site1}} localvips"
            type: subnet
          - name: "{{site1}} network"
            type: container
          - name: "{{site2}} localvips"
            type: subnet
          - name: "{{site2}} network"
            type: subnet
}


answer = ''
1.upto(16) do |i|
  answer << zone.gsub("zone1", "zone#{i}")
end
puts answer
