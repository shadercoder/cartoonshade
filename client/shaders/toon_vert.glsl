
const float thickness = 0.035;
void main(){

 
  vec4 position_world;
  vec3 normal_w = normalMatrix * normal;  
  position_world = modelMatrix *  vec4(position, 1.0);
  float distance = min(length(position_world.xyz - cameraPosition) ,20.0);
  position_world.xyz = position_world.xyz + normal * distance * thickness;

 
  gl_Position= projectionMatrix * viewMatrix * position_world;
  
  /*vec4 projpoint = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  
  vec4 normal_proj = projectionMatrix * modelViewMatrix * vec4(normal, 0.0);
  
  projpoint.xy += normal_proj.xy  * 0.5;
  
  gl_Position = projpoint;*/
  
}